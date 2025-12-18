import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

interface NewUserMailProps {
    name: string;
    email: string;
    phone_Number: number;
    password: string;
    roleLabel: string;
}

interface LeaveStatusMailProps {
    name: string;
    email: string;
    status: "approved" | "rejected";
    fromDate: Date;
    toDate: Date;
}

export const sendNewUserMail = async ({
    name,
    email,
    phone_Number,
    password,
    roleLabel
}: NewUserMailProps) => {
    const html = `
    <p>Hi <strong>${name}</strong>,</p>
    <p>Your <strong>${roleLabel}</strong> account has been created in the HRMS system.</p>
    <p><b>Login URL:</b> ${process.env.APP_BASE_URL}/api/auth/login</p>
    <p><b>Username (Email):</b> ${email}</p>
    <p><b>Temporary Password:</b> ${password}</p>
    <p>Please log in and change your password immediately after first login.</p>
    <p>Best regards,<br/>HRMS System</p>
  `;
    try {
        await transporter.sendMail({
            from: `"HRMS System" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `${roleLabel} Account Created`,
            html
        });
        console.log("Email Sent Successfully");
    } catch (error) {
        console.log("Email Error:", error);
    }

};

export const sendLeaveStatusMail = async ({
  name,
  email,
  status,
  fromDate,
  toDate
}: LeaveStatusMailProps) => {
  const html = `
    <p>Hi <strong>${name}</strong>,</p>
    <p>Your leave request has been <b>${status.toUpperCase()}</b>.</p>
    <p><b>From:</b> ${new Date(fromDate).toDateString()}</p>
    <p><b>To:</b> ${new Date(toDate).toDateString()}</p>
    <p>If you have any questions, please contact HR.</p>
    <p>Regards,<br/>HR Team</p>
  `;

  await transporter.sendMail({
    to: email,
    subject: `Leave Request ${status}`,
    html
  });
};
