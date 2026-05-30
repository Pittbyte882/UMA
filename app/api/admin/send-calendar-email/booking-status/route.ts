import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, date, time, lessonType, status } = await req.json()

    const subjects: Record<string, string> = {
      confirmed: "Your lesson is confirmed! ✓",
      cancelled: "Your lesson booking has been cancelled",
      released: "Your lesson slot has been released",
    }

    const messages: Record<string, string> = {
      confirmed: `
        <h2>Hi ${name},</h2>
        <p>Great news! Your payment has been received and your lesson is now confirmed.</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Lesson:</strong> ${lessonType}</li>
        </ul>
        <p>We look forward to seeing you!</p>
      `,
      cancelled: `
        <h2>Hi ${name},</h2>
        <p>Your lesson booking has been cancelled.</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>If you have any questions please contact us at Samantha@ultimatemusicacademy.com</p>
      `,
      released: `
        <h2>Hi ${name},</h2>
        <p>Your lesson slot has been released because payment was not received in time.</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>You are welcome to rebook at any time. If you have questions please contact us at Samantha@ultimatemusicacademy.com</p>
      `,
    }

    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: email,
      subject: subjects[status] || "Update from Ultimate Music Academy",
      html: `
        ${messages[status] || ""}
        <br/>
        <p>Warm regards,</p>
        <p><strong>Samantha Nelson-Philipp</strong><br/>Ultimate Music Academy</p>
        <p>📞 (424) 230-2179</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}