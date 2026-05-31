import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const { name, email, phone, message } = await req.json()

    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: ["Samantha@ultimatemusicacademy.com"],
      subject: `New Consultation Request from ${name}`,
      html: `
        <!DOCTYPE html><html><head>${emailStyle}</head>
        <body><div class="container">
          <div class="header">
            <h1>UMA</h1>
            <p>New Consultation Request</p>
          </div>
          <div class="divider"></div>
          <div class="body">
            <div class="field"><div class="label">Name</div><div class="value">${name}</div></div>
            <div class="field"><div class="label">Email</div><div class="value">${email}</div></div>
            <div class="field"><div class="label">Phone</div><div class="value">${phone || "Not provided"}</div></div>
            <div class="field"><div class="label">Questionnaire Details</div><div class="value" style="white-space: pre-line;">${message?.split(" | ").join("\n") || ""}</div></div>
          </div>
          ${emailFooter}
        </div></body></html>
      `,
    })

    await resend.emails.send({
      from: "UMA <noreply@ultimatemusicacademy.com>",
      to: email,
      subject: "Your Consultation Request — Ultimate Music Academy",
      html: `
        <!DOCTYPE html><html><head>${emailStyle}</head>
        <body><div class="container">
          <div class="header">
            <h1>UMA</h1>
            <p>Consultation Request Received</p>
          </div>
          <div class="divider"></div>
          <div class="body">
            <p style="font-size:18px; margin-top:0;">Hi ${name},</p>
            <p style="color:#8A776B; line-height:1.8;">Thank you for your interest in Ultimate Music Academy! We've received your questionnaire and will review your answers before reaching out within 24 hours to schedule your complimentary 15-minute consultation.</p>
            <p style="color:#8A776B; line-height:1.8;">We're excited to learn more about you and your musical journey!</p>
            <div style="text-align:center; margin: 32px 0;">
              <p style="font-size:13px; letter-spacing:3px; text-transform:uppercase; color:#D6B98C;">Wake • Build • Shine™</p>
            </div>
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