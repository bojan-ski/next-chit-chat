import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { BannedMember } from "@prisma/client";

export async function GET() {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({ bannedMember: false });

  try {
    const bannedMember: BannedMember | null =
      await prisma.bannedMember.findFirst({
        where: {
          bannedMemberId: userId,
          banDate: {
            gte: new Date(),
          },
        },
      });

    return NextResponse.json({ bannedMember });
  } catch (error) {
    return NextResponse.json({ bannedMember: false });
  }
}
