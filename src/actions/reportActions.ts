"use server";

import prisma from "@/lib/prisma";
import { FormStatus, ReportWithMembers } from "@/types/types";
import { newReportSchema } from "@/utils/schemas";
import { getUserIdAction } from "./authActions";

export async function submitReportAction(
  contentType: string,
  contentId: string,
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
        contentId,
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

export async function fetchReportedMembersAction(): Promise<ReportWithMembers[]> {
  return prisma.report.findMany({
    include: {
      reportedMember: true,
      reporter: true,
    },
  });
}
