"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import {
  deleteImageFromSupabase,
  uploadImageToSupabase,
} from "@/supabase/supabase";
import { imageSchema } from "@/utils/schemas";
import { FormStatus } from "@/types/types";
import { Member, Photo } from "@prisma/client";
import { getUserId } from "./authActions";

export const uploadPhotoAction = async (
  initialState: FormStatus,
  formData: FormData
): Promise<FormStatus> => {
  try {
    // get user id
    const userId: string = await getUserId();

    // extract form data & validate
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

export async function fetchPhotosByUserId(): Promise<Photo[]> {
  // get user id
  const userId: string = await getUserId();

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

async function getMemberByPhotoId(
  photoId: string
): Promise<Member | undefined> {
  try {
    const memberAndPhoto = await prisma.photo.findUnique({
      where: {
        id: photoId,
      },
      include: {
        member: true,
      },
    });

    return memberAndPhoto?.member;
  } catch (error) {
    throw error;
  }
}

export async function deletePhotoAction(photo: Photo): Promise<void> {
  // get user id
  const userId: string = await getUserId();

  // check if user is owner of the photo or if admin user
  const member: Member | undefined = await getMemberByPhotoId(photo.id);
  if (member?.id !== userId && userId !== process.env.ADMIN_USER_ID) {
    throw new Error("Delete photo error!");
  }

  // if all good - run query
  try {
    // delete from db
    await prisma.photo.delete({
      where: {
        id: photo.id,
      },
    });

    // delete from supabase
    await deleteImageFromSupabase(photo.image);
  } catch (error) {
    throw error;
  } finally {
    revalidatePath("/profile-details");
  }
}
