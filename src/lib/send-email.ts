// lib/sendEmail.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Wrap in an async IIFE so we can use await.
export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FOR,
    to,
    subject,
    text, // plain‑text body
    html, // HTML body
  });

  console.log("Message sent:", info.messageId);
};
