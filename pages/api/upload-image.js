import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { image } = req.body;

    if (!image) {
      return res.status(500).json({ message: "No image provided" });
    }
    try {
      const contentType = image.match(/data:(.*);base64/)?.[1];
      const base64FileData = image.split("base64,")?.[1];

      if (!contentType || !base64FileData) {
        return res.status(500).json({ message: "Invalid image" });
      }

      const fileName = nanoid();
      const ext = contentType.split("/")[1];
      const path = `${fileName}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(path, decode(base64FileData), {
          contentType,
          upsert: true,
        });

      if (uploadError) {
        console.log("upload error --> cannot upload to supabase");
        console.log(uploadError);
        throw new Error("Unable to upload image to storage");
      }
      console.log(data.Key);
      console.log(data);
      const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.Key}`;
      console.log(url);
      return res.status(200).json({ url });
    } catch (error) {
      console.log("upload-image error")
      res.status(500).json({ message: error.data });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not supported" });
  }
}
