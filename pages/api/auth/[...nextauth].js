import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import path from 'path';

export default NextAuth({
  pages: {
    signIn: '/signin',
    verifyRequest: '/verifyemail',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 10 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        secure: false,
      },
      async sendVerificationRequest({
        identifier,
        url,
        provider: { server },
      }) {
        const emailsDir = path.resolve(process.cwd(), 'emails');
        const emailFile = readFileSync(path.join(emailsDir, 'confirmation.html'), {
          encoding: 'utf8',
        });
        const emailTemplate = Handlebars.compile(emailFile);
        const transporter = nodemailer.createTransport(server);
        await transporter.sendMail({
          from: `"🔍 FindMyItem" <${process.env.EMAIL_FROM}>`,
          to: identifier,
          subject: "✅ Your sign-in link for FindMyItem",
          html: emailTemplate({
            base_url: process.env.NEXTAUTH_URL,
            signin_url: url,
            email: identifier,
          }),
        });
      },
    }),
  ],
})