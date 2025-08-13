"use server";

import { auth, currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getUserIdAction(): Promise<string> {
  const userId: string | null = (await auth()).userId;

  if (!userId) redirect("/");

  return userId;
}

export async function getUserDataAction(): Promise<User> {
  const user = await currentUser();

  if (!user) redirect("/");

  return user;
}

export async function isAdminAction(): Promise<boolean> {
  const userId: string = await getUserIdAction();

  if (userId !== process.env.ADMIN_USER_ID) {
    return false;
  }

  return true;
}
