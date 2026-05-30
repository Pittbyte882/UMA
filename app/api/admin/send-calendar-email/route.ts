import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { studentName, studentEmail, eventTitle, date, time, notes } = await req.json()

    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: studentEmail,
      subject: `Update from Ultimate Music Academy — ${eventTitle}`,
      html: `
        <h2>Hi ${studentName},</h2>
        <p>This is a message from Ultimate Music Academy regarding your upcoming appointment.</p>
        <ul>
          <li><strong>Appointment:</strong> ${eventTitle}</li>
          <li><strong>Date:</strong> ${date}</li>
          ${time ? `<li><strong>Time:</strong> ${time}</li>` : ""}
          ${notes ? `<li><strong>Notes:</strong> ${notes}</li>` : ""}
        </ul>
        <p>If you have any questions please contact us at:</p>
        <p>📧 Samantha@ultimatemusicacademy.com</p>
        <p>📞 (424) 230-2179</p>
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