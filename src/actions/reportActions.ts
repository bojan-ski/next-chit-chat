"use server";

import prisma from "@/lib/prisma";
import { FormStatus, ReportWithMembers } from "@/types/types";
import { newReportSchema } from "@/utils/schemas";
import { getUserIdAction, isAdminAction } from "./authActions";
import { BannedMember } from "@prisma/client";

export async function submitReportAction(
  contentType: string,
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
    const userId: string = await getUserIdAction();

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
    console.log(error);

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
