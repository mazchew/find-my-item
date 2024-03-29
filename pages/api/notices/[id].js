import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
  const session = await getSession({ req });
  //check if user has logged in
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  //Retrieve user data
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { notices: true },
  });

  //Check if logged in user is the owner of this item
  const { id } = req.query;
  if (!user?.notices?.find((notice) => notice.id === id)) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  //Perform update query
  if (req.method === "PATCH") {
    try {
      const notice = await prisma.notice.update({
        where: { id },
        data: req.body,
      });
      res.status(200).json(notice);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong." });
    }
  } else if (req.method === "DELETE") {
    try {
      const notice = await prisma.notice.delete({
        where: { id },
      });
      res.status(200).json(notice);
    } catch (e) {
      res.status(500).json({ message: "Error" });
    }
  } else {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not suppported.` });
  }
}
