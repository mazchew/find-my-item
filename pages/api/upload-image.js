import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);


export default async function handler(req, res) {
    if (req.method === "POST") {

    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ message: `method not supported` });
    }
}