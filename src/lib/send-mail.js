"use server";
import * as nodemailer from "nodemailer";

export default async function sendMail(name, email, message) {
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

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  await new Promise((resolve, reject) =>
    transporter.sendMail(clientMailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info.response);
      }
    })
  );

  await new Promise((resolve, reject) =>
    transporter.sendMail(secondMailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info.response);
      }
    })
  );
}
