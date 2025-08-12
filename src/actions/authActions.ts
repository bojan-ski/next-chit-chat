"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getUserId(): Promise<string> {
  const userId: string | null = (await auth()).userId;

  if (!userId) redirect("/");

  return userId;
}
