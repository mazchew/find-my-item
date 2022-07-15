import { getSession } from "next-auth/react";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import path from "path";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const userEmail = session.user.email;
  const message = req.body.message;
  const posterEmail = req.body.posterEmail;
  const itemURL = req.body.itemURL;

  if (req.method === "POST") {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      secure: false,
    });

    try {
      const emailsDir = path.resolve(process.cwd(), "emails");
      const emailFile = readFileSync(path.join(emailsDir, "contact.html"), {
        encoding: "utf8",
      });
      const emailTemplate = Handlebars.compile(emailFile);

      await transporter.sendMail({
        from: `"🔍 FindMyItem" <${process.env.EMAIL_FROM}>`,
        to: posterEmail,
        subject: "❗ A user has contacted you regarding your post!",
        html: emailTemplate({
          base_url: process.env.NEXTAUTH_URL,
          userEmail: userEmail,
          message: message,
          email: posterEmail,
          URL: itemURL,
        }),
      });
      res.status(200).json({ message: "Successful" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not suppported.` });
  }
}
