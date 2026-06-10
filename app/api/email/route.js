import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const BETA_NOTIFICATION_RECIPIENT = "christian@vortexmediaconsulting.com";

export async function POST(req) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: `${process.env.EMAILUSERNAME}`,
      pass: `${process.env.BREVO_SMTP_AUTH_KEY}`,
    },
    debug: false,
    logger: true,
  });

  try {
    const { emailAddress, emailSubject, emailBody } = await req.json();

    const validationError = validateCorrectProps({ emailAddress });
    if (validationError) {
      return NextResponse.json(
        { error: validationError.error },
        { status: validationError.status }
      );
    }

    const notificationMailOptions = {
      from: `${process.env.EMAIL_SENDER_ADDRESS}`,
      to: BETA_NOTIFICATION_RECIPIENT,
      subject: `Crantonomo: ${emailSubject}`,
      text: `User with email address ${emailAddress} sends: ${emailBody}`,
      html: `<p>User with email address <strong>${emailAddress}</strong> sends: ${emailBody}</p>`,
    };

    const confirmationMailOptions = {
      from: `${process.env.EMAIL_SENDER_ADDRESS}`,
      to: emailAddress,
      subject: `Crantonomo: ${emailSubject}`,
      text: `Thanks for your email! If it is an interview request or you wish to contract my services, I will be with you within 24 - 48 hours. All other requests I'll respond within a week.`,
      html: `<p>Thanks for your email! If it is an interview request or you wish to contract my services, I will be with you within 24 - 48 hours. All other requests I'll respond within a week.</p>`,
    };

    const [info] = await Promise.all([
      transporter.sendMail(notificationMailOptions),
      transporter.sendMail(confirmationMailOptions),
    ]);

    return NextResponse.json(
      {
        message: "Email confirmation to submitter sent successfully",
        data: info?.response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling user sent email:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export function validateCorrectProps({ emailAddress }) {
  if (!emailAddress) {
    return {
      error: "Email address is required",
      status: 400,
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailAddress)) {
    return {
      error: "Invalid email address format",
      status: 400,
    };
  }
}
