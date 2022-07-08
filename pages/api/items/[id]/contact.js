import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: "Unauthorized." });
    }




}