import { Resend } from "resend"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const resend = new Resend(process.env.RESEND_API_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const emailStyle = `
  <style>
    body { font-family: Georgia, serif; color: #3D2B1F; margin: 0; padding: 0; background: #FDF6F2; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: #B76E79; padding: 32px; text-align: center; }
    .header h1 { color: white; font-size: 28px; margin: 0; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; }
    .divider { height: 3px; background: linear-gradient(90deg, #B76E79, #D6B98C, #B76E79); }
    .body { padding: 40px 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8A776B; margin-bottom: 4px; }
    .value { font-size: 15px; color: #3D2B1F; padding: 10px 14px; background: #FDF6F2; border-left: 3px solid #D6B98C; border-radius: 0 4px 4px 0; }
    .alert { background: #FDF6F2; border: 1px solid #B76E79; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center; }
    .alert p { color: #B76E79; font-size: 14px; margin: 4px 0; }
    .payment-box { background: #3D2B1F; border-radius: 8px; padding: 24px; margin: 24px 0; }
    .payment-box h3 { color: #D6B98C; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 16px; }
    .payment-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .payment-item:last-child { border-bottom: none; }
    .payment-label { color: rgba(255,255,255,0.6); font-size: 13px; }
    .payment-value { color: white; font-size: 13px; font-weight: bold; }
    .footer { background: #3D2B1F; padding: 24px 32px; text-align: center; }
    .footer p { color: rgba(255,255,255,0.6); font-size: 12px; margin: 4px 0; }
    .footer a { color: #D6B98C; text-decoration: none; }
    .tagline { color: #D6B98C; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin-top: 8px; }
  </style>
`

const emailFooter = `
  <div class="footer">
    <p><strong style="color: white;">Ultimate Music Academy</strong></p>
    <p>by Samantha Nelson</p>
    <p><a href="mailto:Samantha@ultimatemusicacademy.com">Samantha@ultimatemusicacademy.com</a> | <a href="mailto:info@ultimatemusicacademy.com">info@ultimatemusicacademy.com</a></p>
    <p><a href="tel:+14242302179">(424) 230-2179</a></p>
    <p class="tagline">Wake • Build • Shine™</p>
  </div>
`

export async function POST(req: Request) {
  try {
    const { name, email, phone, date, time, lessonType } = await req.json()

    // Get payment handles from admin settings
    const { data: settings } = await supabase
      .from("admin_settings")
      .select("key, value")
      .in("key", ["payment_venmo", "payment_cashapp", "payment_zelle", "payment_paypal"])

    const payments: Record<string, string> = {}
    settings?.forEach((s) => {
      payments[s.key.replace("payment_", "")] = s.value
    })

    const paymentHandlesHtml = Object.entries(payments)
      .filter(([_, v]) => v)
      .map(([k, v]) => `
        <div class="payment-item">
          <span class="payment-label">${k.charAt(0).toUpperCase() + k.slice(1)}</span>
          <span class="payment-value">${v}</span>
        </div>
      `).join("")

    // Email to Samantha
    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: ["Samantha@ultimatemusicacademy.com"],
      subject: `New Lesson Booking from ${name}`,
      html: `
        <!DOCTYPE html><html><head>${emailStyle}</head>
        <body><div class="container">
          <div class="header"><h1>UMA</h1><p>New Lesson Booking</p></div>
          <div class="divider"></div>
          <div class="body">
            <div class="field"><div class="label">Student</div><div class="value">${name}</div></div>
            <div class="field"><div class="label">Email</div><div class="value">${email}</div></div>
            <div class="field"><div class="label">Phone</div><div class="value">${phone || "Not provided"}</div></div>
            <div class="field"><div class="label">Date</div><div class="value">${date}</div></div>
            <div class="field"><div class="label">Time</div><div class="value">${time}</div></div>
            <div class="field"><div class="label">Lesson Type</div><div class="value">${lessonType}</div></div>
            <div class="field"><div class="label">Status</div><div class="value">⏳ Pending Payment</div></div>
          </div>
          ${emailFooter}
        </div></body></html>
      `,
    })

    // Email to student with payment instructions
    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: email,
      subject: "Your Lesson is Booked — Payment Required",
      html: `
        <!DOCTYPE html><html><head>${emailStyle}</head>
        <body><div class="container">
          <div class="header"><h1>UMA</h1><p>Lesson Booking Confirmed</p></div>
          <div class="divider"></div>
          <div class="body">
            <p style="font-size:18px; margin-top:0;">Hi ${name},</p>
            <p style="color:#8A776B; line-height:1.8;">Your lesson has been booked! Please review the details below and submit payment to secure your spot.</p>

            <div class="field"><div class="label">Date</div><div class="value">${date}</div></div>
            <div class="field"><div class="label">Time</div><div class="value">${time}</div></div>
            <div class="field"><div class="label">Lesson</div><div class="value">${lessonType}</div></div>

            <div class="alert">
              <p>⚠️ <strong>Payment Required Within 24 Hours</strong></p>
              <p>Your slot will be released if payment is not received in time.</p>
              <p style="font-size:12px; color:#8A776B;">Next-day bookings must be paid within 1 hour.</p>
            </div>

            ${paymentHandlesHtml ? `
            <div class="payment-box">
              <h3>Payment Options</h3>
              ${paymentHandlesHtml}
            </div>
            ` : `
            <p style="color:#8A776B; font-size:13px;">Payment details will be provided shortly. Please contact us at Samantha@ultimatemusicacademy.com</p>
            `}
          </div>
          ${emailFooter}
        </div></body></html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}