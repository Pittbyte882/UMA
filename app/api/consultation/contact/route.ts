import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()

    // Email to Samantha
    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: "Samantha@ultimatemusicacademy.com",
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Auto-reply to sender
    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: email,
      subject: "We received your message!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting Ultimate Music Academy!</p>
        <p>We've received your message and will get back to you within 24-48 hours.</p>
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