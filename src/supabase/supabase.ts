import { createClient } from "@supabase/supabase-js";

const bucket = process.env.SUPABASE_BUCKET_NAME as string;

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImageToSupabase = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;

  const { data } = await supabase.storage.from(bucket).upload(newName, image, {
    cacheControl: "3600",
    upsert: false,
    contentType: image.type,
  });

  if (!data) throw new Error("Image upload failed");

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
