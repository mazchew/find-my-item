import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized. " });
  }

  if (req.method === "POST") {
    try {
      console.log(req.body);
      const { image, title, description, location, category } = req.body;
    //   console.log(image);

      const item = await prisma.item.create({
        data: {
          image,
          title,
          description,
          location,
          category
        },
      });
      res.status(200).json(item);
    } catch (e) {
        console.log(e);
      res.status(500).json({ message: `${e}`  });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
