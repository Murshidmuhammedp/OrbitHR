import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

interface NewUserMailProps {
  name: string;
  email: string;
  password: string;
  roleLabel: string;
}

export const sendNewUserMail = async ({
  name,
  email,
  password,
  roleLabel
}: NewUserMailProps) => {
  const html = `
    <p>Hi <strong>${name}</strong>,</p>
    <p>Your <strong>${roleLabel}</strong> account has been created in the HRMS system.</p>
    <p><b>Login URL:</b> ${process.env.APP_BASE_URL}/login</p>
    <p><b>Username (Email):</b> ${email}</p>
    <p><b>Temporary Password:</b> ${password}</p>
    <p>Please log in and change your password immediately after first login.</p>
    <p>Best regards,<br/>HRMS System</p>
  `;

  await transporter.sendMail({
    from: `"HRMS System" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `${roleLabel} account created`,
    html
  });
};
