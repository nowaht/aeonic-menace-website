'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function AlienScumPage() {
  const [waitlistForm, setWaitlistForm] = useState({
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    // Custom validation with DOS-style messages
    if (!waitlistForm.email.trim()) {
      setSubmitMessage('ERROR: EMAIL ADDRESS REQUIRED')
      setIsSubmitting(false)
      return
    }
    if (!waitlistForm.email.includes('@')) {
      setSubmitMessage('ERROR: EMAIL MUST CONTAIN @')
      setIsSubmitting(false)
      return
    }
    if (!waitlistForm.email.includes('.')) {
      setSubmitMessage('ERROR: EMAIL MUST CONTAIN DOMAIN')
      setIsSubmitting(false)
      return
    }
    if (waitlistForm.email.indexOf('@') === 0) {
      setSubmitMessage('ERROR: EMAIL CANNOT START WITH @')
      setIsSubmitting(false)
      return
    }
    if (waitlistForm.email.indexOf('@') === waitlistForm.email.length - 1) {
      setSubmitMessage('ERROR: EMAIL CANNOT END WITH @')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: waitlistForm.email,
          games: ['alien scum'], // Only subscribe to alien scum
        }),
      })

      if (response.ok) {
        setSubmitMessage('WAITLIST SIGNUP SUCCESSFUL')
        setWaitlistForm({ email: '' })
      } else {
        setSubmitMessage('ERROR JOINING WAITLIST')
      }
    } catch {
      setSubmitMessage('ERROR JOINING WAITLIST')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen p-4" style={{backgroundColor: '#000000', color: '#AFAF4F', fontFamily: 'var(--font-anonymous-pro)', fontSize: '19px'}}>
      <div className="max-w-4xl mx-4 md:ml-8">
        {/* Header with Logo and Navigation */}
        <div className="mb-4">
          <Link href="/" className="inline-block mb-2">
            <Image 
              src="/Images/Aeonic Menace games White Yellow Logo Design-06.png" 
              alt="Aeonic Menace Games Logo" 
              width={192}
              height={90}
              className="max-w-48 mb-1 opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>
          
          {/* Game Logo */}
          <div className="flex items-center justify-start gap-6 mb-4">
            <Image 
              src="/Images/ASLogo-01.png" 
              alt="Alien Scum Logo" 
              width={200}
              height={60}
              className="opacity-92"
              style={{maxHeight: '60px', maxWidth: '200px', objectFit: 'contain'}}
            />
          </div>
          
          {/* Navigation breadcrumb */}
          <div className="text-sm mb-2" style={{color: '#CA6EA7'}}>
            <Link href="/" className="hover:text-white transition-colors">AEONIC MENACE</Link>
            <span> / </span>
            <span style={{color: '#AFAF4F'}}>ALIEN SCUM</span>
          </div>
        </div>

        {/* Separator Bar */}
        <div className="mb-6 animate-pulse w-full md:w-[600px]" style={{borderTop: '1px solid #AFAF4F'}}></div>

        {/* Game Information */}
        <div className="mb-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
            {/* Left Column - Game Info */}
            <div className="order-1">
              <div className="mb-6">
                <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>GAME INFO</h2>
                <div className="flex flex-col gap-2" style={{fontSize: '16px'}}>
                  <div><span style={{color: '#CA6EA7'}}>Medium:</span> Board game</div>
                  <div><span style={{color: '#CA6EA7'}}>Genre:</span> Strategy, deck building <br></br>(play card, move mech)</div>
                  <div><span style={{color: '#CA6EA7'}}>Players:</span> 1-6</div>
                  <div><span style={{color: '#CA6EA7'}}>Status:</span> Kickstarter soon</div>
                  <div><span style={{color: '#CA6EA7'}}>Play time:</span> 45-90 minutes</div>
                </div>
              </div>

              {/* Join Waitlist Form */}
              <div className="mb-6">
                <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>JOIN WAITLIST</h2>
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-2">
                  <div>
                    <label className="block mb-1" style={{color: '#CA6EA7', fontSize: '14px'}}>
                      EMAIL ADDRESS:
                    </label>
                    <input
                      type="text"
                      value={waitlistForm.email}
                      onChange={(e) => setWaitlistForm({ email: e.target.value })}
                      className="w-full max-w-md px-2 py-1 border"
                      style={{
                        backgroundColor: '#000000',
                        color: '#AFAF4F',
                        borderColor: '#CA6EA7',
                        fontFamily: 'var(--font-anonymous-pro)',
                        fontSize: '16px'
                      }}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-3 py-1 border transition-colors text-left hover:text-black w-fit mt-2"
                    style={{
                      borderColor: '#CA6EA7',
                      color: '#AFAF4F',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        (e.target as HTMLElement).style.backgroundColor = '#CA6EA7';
                        (e.target as HTMLElement).style.color = '#000000';
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.color = '#AFAF4F';
                    }}
                  >
                    {isSubmitting ? 'JOINING...' : 'JOIN WAITLIST'}
                  </button>
                  
                  {submitMessage && (
                    <div style={{color: submitMessage.includes('SUCCESSFUL') ? '#AFAF4F' : '#C9383A', marginTop: '4px', fontSize: '14px'}}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>DESCRIPTION</h2>
                <div className="flex flex-col gap-3" style={{fontSize: '16px', lineHeight: '1.4'}}>
                  
                  <p>
                    The city has privatized its exterminators and contracted your mech company to clean the streets. 
                    The queen&apos;s broodlings are spawning everywhere, but aliens might not be your only problem. If you&apos;re not careful, 
                    other mechs competing for the same loot could destroy your company and gain all the glory. 
                  </p>
                  <p>
                    <b><i>Alien Scum!</i></b> is a 1 - 6 player arsenal building strategy game where you can win or lose in many ways. 
                    Will your plan be to destroy the queens, build the most garages, or eliminate the competition? Use action cards to maneuver your mechs. 
                    Expand your arsenal by purchasing stronger abilities and upgrades. Cooperate. Betray. Fight dirty. 
                    Just work fast before the mutating aliens overpower even your most tricked out mechs.
                  </p>
                    <div className="mt-4">
                    <a
                      href="#" // TODO: Add actual PDF link when available
                      className="px-3 py-1 border transition-colors inline-block hover:text-black"
                      style={{
                        borderColor: '#CA6EA7',
                        color: '#AFAF4F',
                        textDecoration: 'none',
                        fontSize: '14px'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = '#CA6EA7';
                        (e.target as HTMLElement).style.color = '#000000';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                        (e.target as HTMLElement).style.color = '#AFAF4F';
                      }}
                    >
                      [↓] DOWNLOAD SELL SHEET / PRESS KIT
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Screenshots/Media */}
            <div className="order-2">
              <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>MEDIA</h2>
              <div className="space-y-4">
                {/* Placeholder for game images */}
                <div className="w-full aspect-video">
                  <Image 
                    src="/Images/BoxCoversFront-02.png" 
                    alt="Alien Scum Box Cover Front" 
                    width={800}
                    height={450}
                    className="w-full h-full object-contain border"
                    style={{borderColor: '#CA6EA7'}}
                  />
                </div>
                <div className="w-full aspect-video">
                  <Image 
                    src="/Images/BoxCoverBack_lg-01.png" 
                    alt="Alien Scum Game Components" 
                    width={800}
                    height={450}
                    className="w-full h-full object-contain border"
                    style={{borderColor: '#CA6EA7'}}
                  />
                </div>
                <div className="w-full aspect-video">
                  <Image 
                    src="/Images/AS_mech-pic.jpg" 
                    alt="Alien Scum Mech Gameplay" 
                    width={800}
                    height={450}
                    className="w-full h-full object-contain border"
                    style={{borderColor: '#CA6EA7'}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back  */}
        <div className="mt-8">
          <Link
            href="/"
            className="px-3 py-1 border transition-colors text-left hover:text-black inline-block"
            style={{
              borderColor: '#EFEA53',
              color: '#AFAF4F',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#EFEA53';
              (e.target as HTMLElement).style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
              (e.target as HTMLElement).style.color = '#AFAF4F';
            }}
          >
            [←] BACK
          </Link>
        </div>
      </div>
    </div>
  )
}