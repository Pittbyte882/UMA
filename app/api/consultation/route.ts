import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()

    // Email to Samantha with full questionnaire
    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: "Samantha@ultimatemusicacademy.com",
      subject: `New Consultation Request from ${name}`,
      html: `
        <h2>New Consultation Questionnaire</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <hr/>
        <h3>Full Questionnaire</h3>
        ${message
          .split(" | ")
          .map((line: string) => `<p>${line.trim()}</p>`)
          .join("")}
      `,
    })

    // Confirmation email to student
    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: email,
      subject: "We received your consultation request!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for completing the Ultimate Music Academy vocal student questionnaire!</p>
        <p>We've received your submission and will review your answers before reaching out within 24 hours to schedule your complimentary 15-minute consultation.</p>
        <p>We're excited to learn more about you and your musical journey!</p>
        <br/>
        <p>Warm regards,</p>
        <p><strong>Samantha Nelson</strong><br/>Ultimate Music Academy</p>
        <p>📧 Samantha@ultimatemusicacademy.com</p>
        <p>📞 (424) 230-2179</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}