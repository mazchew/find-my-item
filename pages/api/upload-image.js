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

      console.log("fileName: " + fileName);
      console.log("ext: " + ext);
      console.log("path: " + path);
      console.log("decoded base64 filedata: " + decode(base64FileData));

      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(path, decode(base64FileData), {
          contentType,
          cacheControl: "3600",
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
      console.log("upload-image error");
<<<<<<< HEAD
      res.status(500).json({ message: error.data });
=======
      res.status(500).json({
        message:
          error.data +
          `ext: ${ext} , path: ${path}, contentType: ${contentType}`,
      });
>>>>>>> 079f20f01de10fcc6597264f67370359e3334d5a
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not supported" });
  }
}
