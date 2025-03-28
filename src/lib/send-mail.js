"use server";
import * as nodemailer from "nodemailer";

export default async function sendMail(name, email, message) {
  try {
    const transporter = nodemailer.createTransport({
      service: "smtp",
      host: process.env.SMTP_SERVER_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_SERVER_USERNAME,
        pass: process.env.SMTP_SERVER_PASSWORD,
      },
    });

    const clientMailOptions = {
      from: `TWF <${process.env.SMTP_SERVER_USERNAME}>`,
      to: email,
      subject: "Message received",
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };

    const secondMailOptions = {
      from: `TWF <${process.env.SMTP_SERVER_USERNAME}>`,
      to: process.env.SMTP_SERVER_USERNAME,
      subject: "New message from DEV.FIELD",
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };

    transporter.sendMail(clientMailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    transporter.sendMail(secondMailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
