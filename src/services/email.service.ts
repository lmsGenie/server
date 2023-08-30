import path from "path";

import CONFIG from "@/configs";
import ejs from "ejs";
import nodemailer from "nodemailer";

import logger from "../logger";

const transport = nodemailer.createTransport({
  host: CONFIG.EMAIL.SMTP_HOST, // hostname
  secure: false, // TLS requires secureConnection to be false
  port: CONFIG.EMAIL.SMTP_PORT, // port for secure SMTP
  auth: {
    user: CONFIG.EMAIL.SMTP_USER,
    pass: CONFIG.EMAIL.SMTP_PASS,
  },
});

transport
  .verify()
  .then(() => logger.info("Connected to email server"))
  .catch((err) => {
    logger.error("Unable to connect to email server.", err);
  });

const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = { from: CONFIG.EMAIL.EMAIL_FROM, to, subject, html };

  await transport.sendMail(msg);
};

const sendVerificationMail = async (
  to: string,
  name: string,
  token: string,
) => {
  const subject = "Email Verification";

  const template = path.join(__dirname, "../templates/verification.ejs");

  const url = CONFIG.VERIFY_URL + encodeURIComponent(token);

  const data = await ejs.renderFile(template, { name, url });

  return sendEmail(to, subject, data);
};

export default {
  sendVerificationMail,
};
