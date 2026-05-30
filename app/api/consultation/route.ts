import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, phone, studentType, experienceLevel, preferredDate, goals } = await req.json()

    // Email to Samantha
    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: "Samantha@ultimatemusicacademy.com",
      subject: `New Consultation Request from ${name}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Student Type:</strong> ${studentType}</p>
        <p><strong>Experience Level:</strong> ${experienceLevel}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate || "Not specified"}</p>
        <p><strong>Goals:</strong> ${goals}</p>
      `,
    })

    // Confirmation email to client
    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: email,
      subject: "We received your consultation request!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out to Ultimate Music Academy!</p>
        <p>We've received your consultation request and will be in touch within 24 hours to confirm your appointment.</p>
        <p>We look forward to speaking with you!</p>
        <br/>
        <p>Warm regards,</p>
        <p><strong>Samantha Nelson-Philipp</strong><br/>Ultimate Music Academy</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}