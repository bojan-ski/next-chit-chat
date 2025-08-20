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
import { getUserIdAction, isAdminAction } from "./authActions";

async function checkPhotoCountAction(): Promise<number> {
  const userId: string = await getUserIdAction();

  return await prisma.photo.count({
    where: {
      memberId: userId,
    },
  });
}

export async function uploadPhotoAction(
  initialState: FormStatus,
  formData: FormData
): Promise<FormStatus> {
  // check if limit reached
  const photoCount = await checkPhotoCountAction();

  if (photoCount >= 12) {
    return {
      status: "error",
      message: "You have reached the limit of 12 photos",
    };
  }

  // if limit not reached run query
  try {
    // get user id
    const userId: string = await getUserIdAction();

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
}

export async function fetchCurrentUserPhotosAction(): Promise<Photo[]> {
  const userId: string = await getUserIdAction();

  const data = await prisma.member.findUnique({
    where: {
      id: userId,
    },
    select: {
      photoGallery: {
        where: {
          memberId: userId,
        },
      },
    },
  });

  return data?.photoGallery || [];
}

async function getMemberByPhotoIdAction(
  photoId: string
): Promise<Member | undefined> {
  const memberAndPhoto = await prisma.photo.findUnique({
    where: {
      id: photoId,
    },
    include: {
      member: true,
    },
  });

  return memberAndPhoto?.member;
}

export async function deletePhotoAction(photo: Photo): Promise<void> {
  // get user id
  const userId: string = await getUserIdAction();

  // check if user is owner of the photo or if admin user
  const member: Member | undefined = await getMemberByPhotoIdAction(photo.id);
  const isAdmin = await isAdminAction();
  if (member?.id !== userId && !isAdmin) {
    throw new Error("Delete photo error");
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

export async function fetchAllPhotosAction(status: boolean): Promise<Photo[]> {
  return await prisma.photo.findMany({
    where: {
      isApproved: status,
    },
  });
}

export async function approvePhotoAction(photoId: string): Promise<void> {
  const isAdmin: boolean = await isAdminAction();
  if (!isAdmin) throw new Error("Unauthorized");

  try {
    await prisma.photo.update({
      where: {
        id: photoId,
      },
      data: {
        isApproved: true,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    revalidatePath("/all-photos");
  }
}
