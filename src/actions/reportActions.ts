"use server";

import prisma from "@/lib/prisma";
import { BannedMember, Message, Photo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deletePhotoAction } from "./photoActions";
import { deleteMessageAction } from "./chatActions";
import { getUserClerkIdAction, isAdminAction } from "./authActions";
import {
  BannedMemberWithDetails,
  FormStatus,
  ReportWithMembers,
} from "@/types/types";
import { newReportSchema } from "@/utils/schemas";

export async function submitReportAction(
  contentType: 'message' | 'photo',
  messageId: string | null,
  photoId: string | null,
  contentOwnerId: string,
  prevState: FormStatus,
  formData: FormData
): Promise<FormStatus> {
  try {
    // get form data - message & validation
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = newReportSchema.safeParse(rawData);

    if (validatedData.error) {
      return {
        status: "error",
        message: validatedData.error.issues[0]?.message || "Validation failed",
      };
    }

    // get user id
    const userId: string = await getUserClerkIdAction();

    // create report in db
    await prisma.report.create({
      data: {
        contentType,
        messageId: messageId || null,
        photoId: photoId || null,
        contentOwnerId,
        report: validatedData.data.report,
        reporterId: userId,
      },
    });

    return {
      status: "success",
      message: "Report submitted",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Submit report error",
    };
  }
}

export async function fetchReportedMembersAction(): Promise<
  ReportWithMembers[]
> {
  const isAdmin: boolean = await isAdminAction();
  if (!isAdmin) throw new Error("Unauthorized");

  return prisma.report.findMany({
    include: {
      reportedMember: true,
      reporter: true,
    },
  });
}

async function fetchMemberBansAction(userId: string): Promise<BannedMember[]> {
  return prisma.bannedMember.findMany({
    where: {
      bannedMemberId: userId,
    },
  });
}

export async function fetchReportedContentAction(reportId: string) {
  const isAdmin: boolean = await isAdminAction();
  if (!isAdmin) throw new Error("Unauthorized");

  const report = await prisma.report.findFirst({
    where: {
      id: reportId,
    },
    include: {
      reportedMember: true,
      reporter: true,
      message: true,
      photo: true,
    },
  });

  if (!report) return null;

  const [reportedMemberBans, reporterBans] = await Promise.all([
    fetchMemberBansAction(report.contentOwnerId),
    fetchMemberBansAction(report.reporterId),
  ]);

  return { report, reporterBans, reportedMemberBans };
}

export async function rejectReportAction(
  reportId: string,
  prevState: FormStatus
): Promise<FormStatus> {
  try {
    const isAdmin = await isAdminAction();
    if (!isAdmin) throw new Error("Unauthorized");

    await prisma.report.delete({
      where: {
        id: reportId,
      },
    });

    revalidatePath("/banned/reports");
  } catch (error) {
    return {
      status: "error",
      message: "Reject report error",
    };
  }

  redirect("/banned/reports");
}

export async function bannedMemberAction(
  reportId: string,
  reportedMemberId: string,
  contentType: "photo" | "message",
  contentData: Photo | Message,
  banReason: string,
  prevState: FormStatus
): Promise<FormStatus> {
  try {
    const isAdmin = await isAdminAction();
    if (!isAdmin) throw new Error("Unauthorized");

    // ban reported member
    const currentDate = new Date();
    const banMemberDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    );

    await prisma.bannedMember.create({
      data: {
        bannedMemberId: reportedMemberId,
        banReason,
        banDate: banMemberDate,
      },
    });

    // delete report
    await prisma.report.delete({
      where: {
        id: reportId,
      },
    });

    // delete reported content - photo || message
    if (contentType === "photo") {
      await deletePhotoAction(contentData as Photo);
    } else {
      const message = contentData as Message;

      await deleteMessageAction(message.id, message.conversationId);
    }

    // revalidate page
    revalidatePath("/banned/reports");
  } catch (error) {
    return {
      status: "error",
      message: "Ban member error",
    };
  }

  // redirect user
  redirect("/banned/reports");
}

export async function fetchBannedMembersAction(): Promise<BannedMemberWithDetails[]> {
  const bannedMembers = await prisma.member.findMany({
    where: {
      bans: { 
        some: {}
       },
    },
    include: {
      bans: true,
    },
  });

  return bannedMembers.map((member) => ({
    member,
    bans: member.bans,
  }));
}
