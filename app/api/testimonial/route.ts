import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, role, quote, rating } = await req.json()

    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: "Samantha@ultimatemusicacademy.com",
      subject: `New Testimonial Submitted by ${name}`,
      html: `
        <h2>New Testimonial Pending Approval</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Role:</strong> ${role || "Not provided"}</p>
        <p><strong>Rating:</strong> ${"⭐".repeat(rating)}</p>
        <p><strong>Testimonial:</strong></p>
        <p><em>"${quote}"</em></p>
        <br/>
        <p>Log in to your admin dashboard to approve or reject this testimonial.</p>
        <a href="https://ultimatemusicacademy.com/admin/testimonials">Review Testimonials</a>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}