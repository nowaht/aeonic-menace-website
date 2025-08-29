import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, games } = await request.json()

    // Validate input
    if (!email || !games || !Array.isArray(games)) {
      return NextResponse.json(
        { error: 'Email and games array are required' },
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

    // Validate games
    const validGames = ['alien scum', 'aeonic tarot', 'light the beacon', 'tar and feather']
    const invalidGames = games.filter(game => !validGames.includes(game))
    if (invalidGames.length > 0) {
      return NextResponse.json(
        { error: `Invalid games: ${invalidGames.join(', ')}` },
        { status: 400 }
      )
    }

    const timestamp = new Date().toISOString()
    const subscriptionData = {
      email,
      timestamp,
      source: 'portfolio-website',
      alienScum: games.includes('alien scum'),
      aeonicTarot: games.includes('aeonic tarot'),
      lightTheBeacon: games.includes('light the beacon'),
      tarAndFeather: games.includes('tar and feather')
    }

    // Log subscription data
    console.log('New subscription:', subscriptionData)

    // Send email notification to Noah
    try {
      const nodemailer = await import('nodemailer').catch(() => null)
      
      if (nodemailer && process.env.GMAIL_USER && process.env.GMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        })

        const selectedGamesList = [
          subscriptionData.alienScum ? 'Alien Scum' : null,
          subscriptionData.aeonicTarot ? 'Aeonic Tarot' : null,
          subscriptionData.lightTheBeacon ? 'Light the Beacon' : null,
          subscriptionData.tarAndFeather ? 'Tar and Feather' : null
        ].filter(Boolean).join(', ')

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: 'noahlistener@gmail.com',
          subject: 'New Game Update Subscription - Aeonic Menace',
          text: `
New subscription received:

Email: ${email}
Games Selected: ${selectedGamesList}
Date: ${new Date(timestamp).toLocaleString()}
Source: Portfolio Website

Game Breakdown:
- Alien Scum: ${subscriptionData.alienScum ? 'YES' : 'NO'}
- Aeonic Tarot: ${subscriptionData.aeonicTarot ? 'YES' : 'NO'}
- Light the Beacon: ${subscriptionData.lightTheBeacon ? 'YES' : 'NO'}
- Tar and Feather: ${subscriptionData.tarAndFeather ? 'YES' : 'NO'}
          `,
          html: `
            <h3>New Game Update Subscription</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Games Selected:</strong> ${selectedGamesList}</p>
            <p><strong>Date:</strong> ${new Date(timestamp).toLocaleString()}</p>
            <p><strong>Source:</strong> Portfolio Website</p>
            
            <h4>Game Breakdown:</h4>
            <ul>
              <li>Alien Scum: ${subscriptionData.alienScum ? '✅ YES' : '❌ NO'}</li>
              <li>Aeonic Tarot: ${subscriptionData.aeonicTarot ? '✅ YES' : '❌ NO'}</li>
              <li>Light the Beacon: ${subscriptionData.lightTheBeacon ? '✅ YES' : '❌ NO'}</li>
              <li>Tar and Feather: ${subscriptionData.tarAndFeather ? '✅ YES' : '❌ NO'}</li>
            </ul>
          `
        })
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError)
    }

    // Add to Google Sheets
    try {
      await addToGoogleSheets(subscriptionData)
    } catch (sheetsError) {
      console.error('Google Sheets error:', sheetsError)
      // Don't fail the request if sheets fails, just log it
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Subscription successful' 
    })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}

async function addToGoogleSheets(data: any) {
  // Google Sheets integration using service account
  const { GoogleAuth } = await import('google-auth-library').catch(() => ({ GoogleAuth: null }))
  const { google } = await import('googleapis').catch(() => ({ google: null }))

  if (!GoogleAuth || !google) {
    throw new Error('Google APIs not available')
  }

  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_ID) {
    throw new Error('Google Sheets credentials not configured')
  }

  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  // Add row to spreadsheet with separate game columns
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'Subscriptions!A:H', // Extended range for more columns
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        data.email,
        data.timestamp,
        data.source,
        data.alienScum ? 'YES' : 'NO',
        data.aeonicTarot ? 'YES' : 'NO',
        data.lightTheBeacon ? 'YES' : 'NO',
        data.tarAndFeather ? 'YES' : 'NO',
        'Active' // Status column
      ]]
    }
  })
}