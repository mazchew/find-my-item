import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const session = await getSession({ req });
    //check if user has logged in
    if (!session) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    //Retrieve user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { items: true },
    });

    //Check if logged in user is the owner of this item
    const { id } = req.query;
    if (!user?.items?.find((item) => item.id === id)) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    //Perform update query
    if (req.method === "PATCH") {
      try {
        const item = await prisma.item.update({
          where: { id },
          data: req.body,
        });
        res.status(200).json(item);
      } catch (e) {
        res.status(500).json({ message: "Something went wrong." });
      }
    }
  } else if (req.method === "DELETE") {
    try {
      const item = await prisma.item.delete({
        where: { id },
      });
      if (item.image) {
        const path = item.image.split(`${process.env.SUPABASE_BUCKET}/`)?.[1];
        await supabase.storage.from(process.env.SUPABASE_BUCKET).remove([path]);
      }
      res.status(200).json(item);
    } catch (e) {
      res.status(500).json({ message: 'Error' });
    }
  } else {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not suppported.` });
  }
}
