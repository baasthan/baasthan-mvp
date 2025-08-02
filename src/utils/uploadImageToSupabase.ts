import { supabase } from "./supabase/client";
import { v4 } from "uuid";

export async function uploadImageToSupabase(
  images: File[],
  bucket: string,
  folder = "upload"
): Promise<string[]> {
  if (!images || images.length === 0) return [];
  try {
    const uploadedUrls: string[] = [];

    for (const image of images) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uniqueName = `${folder}/${v4()}-${image.name}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(uniqueName, buffer, {
          contentType: image.type,
        });

      if (error) {
        return Promise.reject(
          new Error(`Image upload failed: ${error.message}`)
        );
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      uploadedUrls.push(urlData.publicUrl);
    }
    return uploadedUrls;
  } catch (error) {
    return Promise.reject(error);
  }
}
