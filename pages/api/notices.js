import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized. " });
  }

  if (req.method === "POST") {
    try {
      const { title, description, location, category } = req.body;

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      const notice = await prisma.notice.create({
        data: {
          title,
          description,
          location,
          category,
          ownerId: user.id,
        },
      });
      res.status(200).json(notice);
    } catch (e) {
      res.status(500).json({ message: `${e}` });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
