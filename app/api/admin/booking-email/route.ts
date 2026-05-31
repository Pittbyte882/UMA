import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, date, time, lessonType } = await req.json()

    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: email,
      subject: "Reminder from Ultimate Music Academy",
      html: `
        <h2>Hi ${name},</h2>
        <p>This is a reminder about your upcoming lesson.</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Lesson:</strong> ${lessonType}</li>
        </ul>
        <p>If you have any questions please contact us at:</p>
        <p>📧 Samantha@ultimatemusicacademy.com</p>
        <p>📞 (424) 230-2179</p>
        <br/>
        <p>Warm regards,</p>
        <p><strong>Samantha Nelson</strong><br/>Ultimate Music Academy</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}