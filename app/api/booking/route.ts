import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, phone, date, time, lessonType } = await req.json()

    // Email to Samantha
    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: "Samantha@ultimatemusicacademy.com",
      subject: `New Lesson Booking from ${name}`,
      html: `
        <h2>New Lesson Booking</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Lesson Type:</strong> ${lessonType}</p>
        <p><strong>Status:</strong> Pending payment</p>
      `,
    })

    // Confirmation email to client with payment reminder
    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: email,
      subject: "Your Lesson Booking — Payment Required",
      html: `
        <h2>Hi ${name}, your lesson is booked!</h2>
        <p>Here are your booking details:</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Lesson Type:</strong> ${lessonType}</li>
        </ul>
        <p style="color: #B76E79; font-weight: bold;">
          ⚠️ Important: Please submit payment within 24 hours to secure your spot. 
          Unpaid bookings will be released so other students can book that time.
        </p>
        <h3>Payment Options</h3>
        <p>Payment handles will be added here soon.</p>
        <br/>
        <p>If you have any questions, reply to this email or contact us at:</p>
        <p>📧 Samantha@ultimatemusicacademy.com</p>
        <p>📞 (424) 230-2179</p>
        <br/>
        <p>We look forward to your lesson!</p>
        <p><strong>Samantha Nelson</strong><br/>Ultimate Music Academy</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}