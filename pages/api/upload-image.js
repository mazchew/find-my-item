import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";

const supabase = createClient(
  "https://dpgffxgdkkvcmhdssyac.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZ2ZmeGdka2t2Y21oZHNzeWFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1NjAwOTczNywiZXhwIjoxOTcxNTg1NzM3fQ.iYgaGjyzZTqWOeMSiN54_v-BoWK5g9WnFYZWanRF-rY"
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
        .from("findmyitem")
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
      const url = `https://dpgffxgdkkvcmhdssyac.supabase.co/storage/v1/object/public/${data.Key}`;
      console.log(url);
      return res.status(200).json({ url });
    } catch (error) {
      console.log("upload-image error");
      res.status(500).json({ message: error.data });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not supported" });
  }
}
