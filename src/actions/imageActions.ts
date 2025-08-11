"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { uploadImageToSupabase } from "@/supabase/supabase";
import { imageSchema } from "@/utils/schemas";
import { FormStatus } from "@/types/types";

export const uploadImage = async (
  initialState: FormStatus,
  formData: FormData
) => {
  // get clerk id from clerk
  const userId = (await auth()).userId;
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
    const publicUrl = await uploadImageToSupabase(file);

    // upload to db
    await prisma.image.create({
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
