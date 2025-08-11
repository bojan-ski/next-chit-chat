"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { uploadImageToSupabase } from "@/supabase/supabase";
import { imageSchema } from "@/utils/schemas";
import { FormStatus } from "@/types/types";
import { Photo } from "@prisma/client";

export const uploadImage = async (
  initialState: FormStatus,
  formData: FormData
): Promise<FormStatus | null> => {
  // get clerk id from clerk
  const userId: string | null = (await auth()).userId;
  if (!userId) return null;

  // if all good - run query
  try {
    // extract data & validate
    const rawData = formData.get("image");
    const imageData = imageSchema.safeParse({ image: rawData });

    if (!imageData.success) {
      return {
        status: "error",
        message: "Image upload error",
      };
    }

    const file = imageData.data.image as File;

    // upload to supabase
    const publicUrl: string = await uploadImageToSupabase(file);

    // upload to db
    await prisma.photo.create({
      data: {
        memberId: userId,
        image: publicUrl,
      },
    });
    return {
      status: "success",
      message: "Image uploaded successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "There was an error uploading the image",
    };
  } finally {
    revalidatePath("/profile-details");
  }
};

export async function fetchPhotosByUserId(): Promise<Photo[] | null> {
  // get clerk id from clerk
  const userId: string | null = (await auth()).userId;
  if (!userId) return null;

  const data = await prisma.member.findUnique({
    where: {
      id: userId,
    },
    select: {
      photoGallery: {
        where: {
          memberId: userId,
          // isApproved: true,
        },
      },
    },
  });

  return data?.photoGallery || [];
}
