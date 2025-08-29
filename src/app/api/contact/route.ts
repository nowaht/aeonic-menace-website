import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, message } = await request.json()

    // Validate input
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create email content
    const emailContent = {
      to: 'noahlistener@gmail.com',
      subject: 'New Contact Form Submission - Aeonic Menace',
      text: `
New contact form submission from your portfolio:

From: ${email}
Message:
${message}

Sent from: ${request.headers.get('host') || 'dos-portfolio'}
      `,
      html: `
        <h3>New contact form submission from your portfolio</h3>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from: ${request.headers.get('host') || 'dos-portfolio'}</small></p>
      `
    }

    // Use nodemailer with Gmail SMTP (you'll need to set environment variables)
    // For production, you should set up proper email service credentials
    
    const nodemailer = await import('nodemailer').catch(() => null)
    
    if (nodemailer && process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS, // Use app-specific password
          },
        })

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: 'noahlistener@gmail.com',
          replyTo: email,
          subject: 'New Contact Form Submission - Aeonic Menace',
          text: emailContent.text,
          html: emailContent.html,
        })

        return NextResponse.json({ success: true, message: 'Email sent successfully' })
      } catch (emailError) {
        console.error('Email sending error:', emailError)
      }
    }

    // Fallback: For now, just log the submission (replace with your preferred email service)
    console.log('Contact form submission:', {
      from: email,
      message: message,
      timestamp: new Date().toISOString()
    })

    // Return success (in production, you'd only return success if email actually sent)
    return NextResponse.json({ success: true, message: 'Message received successfully' })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}