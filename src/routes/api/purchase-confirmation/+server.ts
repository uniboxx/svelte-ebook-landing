import { json } from "@sveltejs/kit";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import sgMail from "@sendgrid/mail";
import { MAILERSEND_API_KEY, SENDGRID_API_KEY } from "$env/static/private";

sgMail.setApiKey(SENDGRID_API_KEY);

const PDF_GUIDE_URL =
  "https://narrify-public.s3.eu-central-1.amazonaws.com/sample.pdf";

const mailersend = new MailerSend({
  apiKey: MAILERSEND_API_KEY || "",
});
const sentFrom = new Sender("unibox@duck.com", "unibox");

export async function POST({ request }) {
  const requestBody = await request.json();
  console.log(requestBody);

  const response = await fetch(PDF_GUIDE_URL);
  const pdfBuffer = await response.arrayBuffer();
  const base64Pdf = Buffer.from(pdfBuffer).toString("base64");

  const customerEmail = requestBody.data.object.customer_details.email;
  const customerName = requestBody.data.object.customer_details.name;
  const recipients = [new Recipient(customerEmail, customerName)];

  const emailHtml = `
    <h1>Thank You for Your Purchase!</h1>
    <p>Dear ${customerName},</p>
    <p>We appreciate your purchase of the <strong>Complete Spain Relocation Guide</strong>, we're confident that this ebook will provide you with best informations.</p>
    <p><strong>what happens next</strong></p>
    <ul>
      <li>You will find your ebook attached to this email. Please download and save it for future reference.</li>
      <li>A separate purchase confirmation has been sent to your email as well.</li>
      <li>If you have any questions or need further assistance, don't hesitate to reach out to us at test@test.com</li>
    </ul>
    <p>Thank you once again for choosing our guide. We wish you the best of luck on your journey to Spain</p>
    <p>Best regards,<br/>The unibox agency</p>
    `;
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Your Purchase Confirmation - Complete Spain Relocation Guide")
    .setHtml(emailHtml);

  // await mailersend.email.send(emailParams);

  const message = {
    to: customerEmail,
    from: "unibox@duck.com",
    subject: "Your Purchase Confirmation - Complete Spain Relocation Guide",
    html: `
    <h1>Thank You for Your Purchase!</h1>
    <p>Dear ${customerName},</p>
    <p>We appreciate your purchase of the <strong>Complete Spain Relocation Guide</strong>, we're confident that this ebook will provide you with best informations.</p>
    <p><strong>what happens next</strong></p>
    <ul>
      <li>You will find your ebook attached to this email. Please download and save it for future reference.</li>
      <li>A separate purchase confirmation has been sent to your email as well.</li>
      <li>If you have any questions or need further assistance, don't hesitate to reach out to us at test@test.com</li>
    </ul>
    <p>Thank you once again for choosing our guide. We wish you the best of luck on your journey to Spain</p>
    <p>Best regards,<br/>The unibox agency</p>
    `,
    attachments: [
      {
        content: base64Pdf,
        filename: "Digital Ebook - Spain relocation.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  await sgMail.send(message);

  return json({ response: "Email sent" });
}
