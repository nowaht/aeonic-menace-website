 'use client'

  import { useState, useEffect } from 'react'
  import Link from 'next/link'

  /*
  COLOR STYLE GUIDE - DOS Portfolio Theme
  =====================================
  #EFEA53 - Yellow (bright accent)
  #C9383A - Red (error/warning)
  #CA6EA7 - Pink (primary accent, buttons, borders)
  #AFAF4F - Light Green (primary text, success)
  #332B2B - Dark Green (dark backgrounds)
  #5B5B47 - Medium Green (mid-tone backgrounds)
  #53539F - Dusky Blue (special accents)
  
  Currently using:
  - #000000: Main background
  - #AFAF4F: Primary text color
  - #CA6EA7: Button borders, labels, form elements
  */

  export default function Home() {
    const [command, setCommand] = useState('')
    const [contactForm, setContactForm] = useState({
      email: '',
      message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    const [subscriptionForm, setSubscriptionForm] = useState({
      email: '',
      games: {
        'alien scum!': false,
        'aeonic tarot': false,
        'light the beacon': false,
        'tar and feather': false
      },
      all: false
    })
    const [isSubscribing, setIsSubscribing] = useState(false)
    const [subscriptionMessage, setSubscriptionMessage] = useState('')
    const [expandedSections, setExpandedSections] = useState({
      games: false,
      contact: false,
      join: false,
      updates: false,
      discord: false,
      'alien scum!': false,
      'aeonic tarot': false,
      'light the beacon': false,
      'tar and feather': false
    })
    const [output, setOutput] = useState([
      'Aeonic Menace', 
      'An indie game studio',
      'In Minnesota',
      
           
    ])

    const toggleSection = (section: string) => {
      setExpandedSections(prev => {
        // If it's a main section (contact, join, games), close others
        if (['contact', 'join', 'games'].includes(section)) {
          return {
            games: section === 'games' ? !prev.games : false,
            contact: section === 'contact' ? !prev.contact : false,
            join: section === 'join' ? !prev.join : false,
            updates: section === 'join' && !prev.join ? false : prev.updates,
            discord: section === 'join' && !prev.join ? false : prev.discord,
            'alien scum!': section === 'games' && !prev.games ? false : prev['alien scum!'],
            'aeonic tarot': section === 'games' && !prev.games ? false : prev['aeonic tarot'],
            'light the beacon': section === 'games' && !prev.games ? false : prev['light the beacon'],
            'tar and feather': section === 'games' && !prev.games ? false : prev['tar and feather']
          }
        }

        // For JOIN sub-sections (updates, discord), close others
        if (['updates', 'discord'].includes(section)) {
          return {
            ...prev,
            updates: section === 'updates' ? !prev.updates : false,
            discord: section === 'discord' ? !prev.discord : false
          }
        }
        
        // For individual games, close other games when opening a new one
        if (['alien scum!', 'aeonic tarot', 'light the beacon', 'tar and feather'].includes(section)) {
          return {
            ...prev,
            'alien scum!': section === 'alien scum!' ? !prev['alien scum!'] : false,
            'aeonic tarot': section === 'aeonic tarot' ? !prev['aeonic tarot'] : false,
            'light the beacon': section === 'light the beacon' ? !prev['light the beacon'] : false,
            'tar and feather': section === 'tar and feather' ? !prev['tar and feather'] : false
          }
        }
        
        // For other sections, just toggle normally
        return {
          ...prev,
          [section]: !prev[section]
        }
      })
    }

    const handleContactSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setSubmitMessage('')

      // Custom validation with DOS-style messages
      if (!contactForm.email.trim()) {
        setSubmitMessage('ERROR: EMAIL ADDRESS REQUIRED')
        setIsSubmitting(false)
        return
      }
      if (!contactForm.email.includes('@')) {
        setSubmitMessage('ERROR: EMAIL MUST CONTAIN @')
        setIsSubmitting(false)
        return
      }
      if (!contactForm.email.includes('.')) {
        setSubmitMessage('ERROR: EMAIL MUST CONTAIN DOMAIN')
        setIsSubmitting(false)
        return
      }
      if (contactForm.email.indexOf('@') === 0) {
        setSubmitMessage('ERROR: EMAIL CANNOT START WITH @')
        setIsSubmitting(false)
        return
      }
      if (contactForm.email.indexOf('@') === contactForm.email.length - 1) {
        setSubmitMessage('ERROR: EMAIL CANNOT END WITH @')
        setIsSubmitting(false)
        return
      }
      if (!contactForm.message.trim()) {
        setSubmitMessage('ERROR: MESSAGE REQUIRED')
        setIsSubmitting(false)
        return
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: contactForm.email,
            message: contactForm.message,
          }),
        })

        if (response.ok) {
          setSubmitMessage('MESSAGE SENT SUCCESSFULLY')
          setContactForm({ email: '', message: '' })
        } else {
          setSubmitMessage('ERROR SENDING MESSAGE')
        }
      } catch (error) {
        setSubmitMessage('ERROR SENDING MESSAGE')
      } finally {
        setIsSubmitting(false)
      }
    }

    const handleAllGamesToggle = () => {
      const newAllState = !subscriptionForm.all
      setSubscriptionForm(prev => ({
        ...prev,
        all: newAllState,
        games: {
          'alien scum!': newAllState,
          'aeonic tarot': newAllState,
          'light the beacon': newAllState,
          'tar and feather': newAllState
        }
      }))
    }

    const handleGameToggle = (game: string) => {
      setSubscriptionForm(prev => {
        const newGames = { ...prev.games, [game]: !prev.games[game] }
        const allSelected = Object.values(newGames).every(Boolean)
        return {
          ...prev,
          games: newGames,
          all: allSelected
        }
      })
    }

    const handleSubscriptionSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubscribing(true)
      setSubscriptionMessage('')

      // Custom validation with DOS-style messages
      if (!subscriptionForm.email.trim()) {
        setSubscriptionMessage('ERROR: EMAIL ADDRESS REQUIRED')
        setIsSubscribing(false)
        return
      }
      if (!subscriptionForm.email.includes('@')) {
        setSubscriptionMessage('ERROR: EMAIL MUST CONTAIN @')
        setIsSubscribing(false)
        return
      }
      if (!subscriptionForm.email.includes('.')) {
        setSubscriptionMessage('ERROR: EMAIL MUST CONTAIN DOMAIN')
        setIsSubscribing(false)
        return
      }
      if (subscriptionForm.email.indexOf('@') === 0) {
        setSubscriptionMessage('ERROR: EMAIL CANNOT START WITH @')
        setIsSubscribing(false)
        return
      }
      if (subscriptionForm.email.indexOf('@') === subscriptionForm.email.length - 1) {
        setSubscriptionMessage('ERROR: EMAIL CANNOT END WITH @')
        setIsSubscribing(false)
        return
      }
      
      const selectedGames = Object.entries(subscriptionForm.games)
        .filter(([_, selected]) => selected)
        .map(([game, _]) => game)
      
      if (selectedGames.length === 0) {
        setSubscriptionMessage('ERROR: SELECT AT LEAST ONE GAME')
        setIsSubscribing(false)
        return
      }

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: subscriptionForm.email,
            games: selectedGames,
          }),
        })

        if (response.ok) {
          setSubscriptionMessage('SUBSCRIPTION SUCCESSFUL')
          setSubscriptionForm({
            email: '',
            games: {
              'alien scum!': false,
              'aeonic tarot': false,
              'light the beacon': false,
              'tar and feather': false
            },
            all: false
          })
        } else {
          setSubscriptionMessage('ERROR SUBSCRIBING')
        }
      } catch (error) {
        setSubscriptionMessage('ERROR SUBSCRIBING')
      } finally {
        setIsSubscribing(false)
      }
    }

    const clearScreen = () => {
      setOutput([
        'Aeonic Menace is an independent game studio in St Paul, MN.',
        'Welcome.',
        '',
        ''
      ])
      setExpandedSections({
        games: false,
        contact: false,
        join: false,
        'alien scum!': false,
        'aeonic tarot': false,
        'light the beacon': false,
        'tar and feather': false
      })
      setCommand('')
    }

    return (
      <div className="min-h-screen p-4" style={{backgroundColor: '#000000', color: '#AFAF4F', fontFamily: 'var(--font-anonymous-pro)', fontSize: '19px'}}>
        <div className="max-w-4xl ml-8">
          {/* Logo */}
          <div className="mb-1">
            <img 
              src="/images/Aeonic Menace games White Yellow Logo Design-06.png" 
              alt="Aeonic Menace Games Logo" 
              className="max-w-64 mb-1 opacity-80"
            />
          </div>
          
          {/* Text and Logo Above Bar */}
          <div className="mb-2 flex justify-between items-end" style={{width: '600px'}}>
            {/* Description Text */}
            <div className="flex-1">
              {output.map((line, index) => (
                <div key={index} className="leading-relaxed">
                  {line || '\u00A0'}
                </div>
              ))}
            </div>
            
            {/* Game Logo Display */}
            <div className="flex items-center" style={{height: '60px', marginLeft: '20px'}}>
              {expandedSections['alien scum!'] && (
                <img 
                  src="/Images/ASLogo-01.png" 
                  alt="Alien Scum Logo" 
                  className="opacity-92"
                  style={{maxHeight: '60px', maxWidth: '200px', objectFit: 'contain'}}
                />
              )}
              {expandedSections['aeonic tarot'] && (
                <img 
                  src="/Images/AeonicTitleW.png" 
                  alt="Aeonic Tarot Logo" 
                  className="opacity-92"
                  style={{maxHeight: '60px', maxWidth: '200px', objectFit: 'contain'}}
                />
              )}
              {expandedSections['light the beacon'] && (
                <img 
                  src="/Images/LtBlogo2.png" 
                  alt="Light the Beacon Logo" 
                  className="opacity-100"
                  style={{maxHeight: '60px', maxWidth: '200px', objectFit: 'contain'}}
                />
              )}
              {expandedSections['tar and feather'] && (
                <img 
                  src="/Images/TaFLogo.png" 
                  alt="Tar and Feather Logo" 
                  className="opacity-92"
                  style={{maxHeight: '60px', maxWidth: '200px', objectFit: 'contain'}}
                />
              )}
            </div>
          </div>

          {/* Separator Bar */}
          <div className="mb-6 animate-pulse" style={{borderTop: '1px solid #AFAF4F', width: '600px'}}></div>

          {/* Navigation Tree */}
          <div className="mb-8">
            <div className="flex flex-col gap-4">
              
              {/* Games Section */}
              <div>
                <button
                  onClick={() => toggleSection('games')}
                  className="px-3 py-1 border transition-colors text-left hover:text-black"
                  style={{
                    borderColor: '#CA6EA7',
                    color: '#AFAF4F',
                    width: 'fit-content'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#CA6EA7'
                    (e.target as HTMLElement).style.color = '#000000'
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent'
                    (e.target as HTMLElement).style.color = '#AFAF4F'
                  }}
                >
                  {expandedSections.games ? '[-]' : '[+]'} GAMES
                </button>
                {expandedSections.games && (
                  <div className="ml-6 mt-2 flex flex-col gap-2" style={{color: '#CA6EA7'}}>
                    
                    {/* Alien Scum! */}
                    <div>
                      <button
                        onClick={() => toggleSection('alien scum!')}
                        className="px-3 py-1 border transition-colors text-left hover:text-black ml-6"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          width: 'fit-content'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = '#CA6EA7'
                          (e.target as HTMLElement).style.color = '#000000'
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent'
                          (e.target as HTMLElement).style.color = '#AFAF4F'
                        }}
                      >
                        {expandedSections['alien scum!'] ? '[-]' : '[+]'} ALIEN SCUM!
                      </button>
                      {expandedSections['alien scum!'] && (
                        <div className="ml-8 mt-1 flex flex-col gap-1" style={{color: '#AFAF4F', fontSize: '16px'}}>
                          <div>   Medium: Board game</div>
                          <div>   Genre: Strategy, deck building</div>
                          <div>   Status: Kickstarter soon-ish</div>
                          <div className="mt-0">   
                            <Link 
                              href="/alien-scum" 
                              className="px-2 py-0 border transition-colors hover:text-black inline-block"
                              style={{
                                borderColor: '#EFEA53',
                                color: '#AFAF4F',
                                textDecoration: 'none',
                                fontSize: '14x'
                              }}
                              onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.backgroundColor = '#EFEA53'
                                (e.target as HTMLElement).style.color = '#000000'
                              }}
                              onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.backgroundColor = 'transparent'
                                (e.target as HTMLElement).style.color = '#AFAF4F'
                              }}
                            >
                              → ALIEN SCUM!
                            </Link>
                            <div></div>
                          </div>

                        </div>
                      )}
                    </div>

                    {/* Aeonic Tarot */}
                    <div>
                      <button
                        onClick={() => toggleSection('aeonic tarot')}
                        className="px-3 py-1 border transition-colors text-left hover:text-black ml-6"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          width: 'fit-content'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = '#CA6EA7'
                          (e.target as HTMLElement).style.color = '#000000'
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent'
                          (e.target as HTMLElement).style.color = '#AFAF4F'
                        }}
                      >
                        {expandedSections['aeonic tarot'] ? '[-]' : '[+]'} AEONIC TAROT
                      </button>
                      {expandedSections['aeonic tarot'] && (
                        <div className="ml-8 mt-1 flex flex-col gap-1" style={{color: '#AFAF4F', fontSize: '16px'}}>
                          <div>   Medium: Cards</div>
                          <div>   Genre: Oracle deck</div>
                          <div>   Status: Limited supply</div>
                          <div className="mt-0">   
                            <Link 
                              href="/aeonic-tarot" 
                              className="px-2 py-0 border transition-colors hover:text-black inline-block"
                              style={{
                                borderColor: '#EFEA53',
                                color: '#AFAF4F',
                                textDecoration: 'none',
                                fontSize: '14x'
                              }}
                              onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.backgroundColor = '#EFEA53'
                                (e.target as HTMLElement).style.color = '#000000'
                              }}
                              onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.backgroundColor = 'transparent'
                                (e.target as HTMLElement).style.color = '#AFAF4F'
                              }}
                            >
                              → AEONIC TAROT
                            </Link>
                            <div></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Light the Beacon */}
                    <div>
                      <button
                        onClick={() => toggleSection('light the beacon')}
                        className="px-3 py-1 border transition-colors text-left hover:text-black ml-6"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          width: 'fit-content'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = '#CA6EA7'
                          (e.target as HTMLElement).style.color = '#000000'
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent'
                          (e.target as HTMLElement).style.color = '#AFAF4F'
                        }}
                      >
                        {expandedSections['light the beacon'] ? '[-]' : '[+]'} LIGHT THE BEACON
                      </button>
                      {expandedSections['light the beacon'] && (
                        <div className="ml-8 mt-1 flex flex-col gap-1" style={{color: '#AFAF4F', fontSize: '16px'}}>
                          <div>   Medium: Videogame</div>
                          <div>   Genre: turn-based tactical roguelike</div>
                          <div>   Status: Someday...</div>
                          <div className="mt-0">   
                            <Link 
                              href="/light-the-beacon" 
                              className="px-2 py-0 border transition-colors hover:text-black inline-block"
                              style={{
                                borderColor: '#EFEA53',
                                color: '#AFAF4F',
                                textDecoration: 'none',
                                fontSize: '14x'
                              }}
                              onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.backgroundColor = '#EFEA53'
                                (e.target as HTMLElement).style.color = '#000000'
                              }}
                              onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.backgroundColor = 'transparent'
                                (e.target as HTMLElement).style.color = '#AFAF4F'
                              }}
                            >
                              → LIGHT THE BEACON
                            </Link>
                            <div></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tar and Feather */}
                    <div>
                      <button
                        onClick={() => toggleSection('tar and feather')}
                        className="px-3 py-1 border transition-colors text-left hover:text-black ml-6"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          width: 'fit-content'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = '#CA6EA7'
                          (e.target as HTMLElement).style.color = '#000000'
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent'
                          (e.target as HTMLElement).style.color = '#AFAF4F'
                        }}
                      >
                        {expandedSections['tar and feather'] ? '[-]' : '[+]'} TAR AND FEATHER
                      </button>
                      {expandedSections['tar and feather'] && (
                        <div className="ml-8 mt-1 flex flex-col gap-1" style={{color: '#AFAF4F', fontSize: '16px'}}>
                          <div>   Medium: Videogame</div>
                          <div>   Genre: Interactive narrative</div>
                          <div>   Status: Now on Steam!</div>
                          <div className="mt-0">   
                            <Link 
                              href="/tar-and-feather" 
                              className="px-2 py-0 border transition-colors hover:text-black inline-block"
                              style={{
                                borderColor: '#EFEA53',
                                color: '#AFAF4F',
                                textDecoration: 'none',
                                fontSize: '14x'
                              }}
                              onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.backgroundColor = '#EFEA53'
                                (e.target as HTMLElement).style.color = '#000000'
                              }}
                              onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.backgroundColor = 'transparent'
                                (e.target as HTMLElement).style.color = '#AFAF4F'
                              }}
                            >
                              → TAR AND FEATHER
                            </Link>
                            <div></div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>

              {/* Contact Section */}
              <div>
                <button
                  onClick={() => toggleSection('contact')}
                  className="px-3 py-1 border transition-colors text-left hover:text-black"
                  style={{
                    borderColor: '#CA6EA7',
                    color: '#AFAF4F',
                    width: 'fit-content'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#CA6EA7'
                    (e.target as HTMLElement).style.color = '#000000'
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent'
                    (e.target as HTMLElement).style.color = '#AFAF4F'
                  }}
                >
                  {expandedSections.contact ? '[-]' : '[+]'} CONTACT
                </button>
                {expandedSections.contact && (
                  <div className="ml-6 mt-2" style={{color: '#AFAF4F'}}>
                    <form onSubmit={handleContactSubmit} className="flex flex-col gap-1">
                      <div>
                        <label className="block mb-1" style={{color: '#CA6EA7'}}>
                          EMAIL ADDRESS:
                        </label>
                        <input
                          type="text"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full max-w-md px-2 py-1 border"
                          style={{
                            backgroundColor: '#000000',
                            color: '#AFAF4F',
                            borderColor: '#CA6EA7',
                            fontFamily: 'var(--font-anonymous-pro)'
                          }}
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1" style={{color: '#CA6EA7'}}>
                          MESSAGE:
                        </label>
                        <textarea
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full max-w-md px-2 py-1 border resize-none"
                          rows={4}
                          style={{
                            backgroundColor: '#000000',
                            color: '#AFAF4F',
                            borderColor: '#CA6EA7',
                            fontFamily: 'var(--font-anonymous-pro)'
                          }}
                          placeholder="Enter your message here..."
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-3 py-1 border transition-colors text-left hover:text-black w-fit"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          backgroundColor: 'transparent',
                          marginTop: '0px'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) {
                            (e.target as HTMLElement).style.backgroundColor = '#CA6EA7'
                            (e.target as HTMLElement).style.color = '#000000'
                          }
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent'
                          (e.target as HTMLElement).style.color = '#AFAF4F'
                        }}
                      >
                        {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                      </button>
                      
                      {submitMessage && (
                        <div style={{color: submitMessage.includes('SUCCESS') ? '#AFAF4F' : '#C9383A', marginTop: '4px'}}>
                          {submitMessage}
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>

              {/* Join Section */}
              <div>
                <button
                  onClick={() => toggleSection('join')}
                  className="px-3 py-1 border transition-colors text-left hover:text-black"
                  style={{
                    borderColor: '#CA6EA7',
                    color: '#AFAF4F',
                    width: 'fit-content'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#CA6EA7'
                    (e.target as HTMLElement).style.color = '#000000'
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent'
                    (e.target as HTMLElement).style.color = '#AFAF4F'
                  }}
                >
                  {expandedSections.join ? '[-]' : '[+]'} JOIN
                </button>
                {expandedSections.join && (
                  <div className="ml-6 mt-2 flex flex-col gap-2" style={{color: '#CA6EA7'}}>
                    
                    {/* S Section */}
                    <div>
                      <button
                        onClick={() => toggleSection('updates')}
                        className="px-3 py-1 border transition-colors text-left hover:text-black ml-6"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          width: 'fit-content'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = '#CA6EA7'
                          (e.target as HTMLElement).style.color = '#000000'
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent'
                          (e.target as HTMLElement).style.color = '#AFAF4F'
                        }}
                      >
                        {expandedSections.s ? '[-]' : '[+]'} UPDATES
                      </button>
                      {expandedSections.updates && (
                        <div className="ml-4 mt-2" style={{color: '#AFAF4F'}}>
                          <form onSubmit={handleSubscriptionSubmit} className="flex flex-col gap-2">
                            <div>
                              <label className="block mb-1" style={{color: '#CA6EA7'}}>
                                EMAIL ADDRESS:
                              </label>
                              <input
                                type="text"
                                value={subscriptionForm.email}
                                onChange={(e) => setSubscriptionForm(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full max-w-md px-2 py-1 border"
                                style={{
                                  backgroundColor: '#000000',
                                  color: '#AFAF4F',
                                  borderColor: '#CA6EA7',
                                  fontFamily: 'var(--font-anonymous-pro)'
                                }}
                                placeholder="your@email.com"
                              />
                            </div>
                            
                            <div>
                              <label className="block mb-2" style={{color: '#CA6EA7'}}>
                                RECEIVE UPDATES ON:
                              </label>
                              
                              {/* All Games Toggle */}
                              <div className="flex items-center gap-2 mb-1">
                                <input
                                  type="checkbox"
                                  id="all-games"
                                  checked={subscriptionForm.all}
                                  onChange={handleAllGamesToggle}
                                  className="w-4 h-4"
                                  style={{accentColor: '#CA6EA7'}}
                                />
                                <label htmlFor="all-games" className="leading-none" style={{color: '#AFAF4F', fontSize: '14px', paddingTop: '1px'}}>
                                  ALL GAMES
                                </label>
                              </div>
                              
                              {/* Individual Game Toggles - Two Column Layout */}
                              <div className="ml-4">
                                <div className="grid grid-cols-2 gap-y-1" style={{gridTemplateColumns: '200px 200px', columnGap: '10px'}}>
                                  {Object.entries(subscriptionForm.games).map(([game, selected]) => (
                                    <div key={game} className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        id={game}
                                        checked={selected}
                                        onChange={() => handleGameToggle(game)}
                                        className="w-4 h-4"
                                        style={{accentColor: '#CA6EA7'}}
                                      />
                                      <label htmlFor={game} className="leading-none" style={{color: '#AFAF4F', fontSize: '14px', paddingTop: '1px'}}>
                                        {game.toUpperCase()}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <button
                              type="submit"
                              disabled={isSubscribing}
                              className="px-3 py-1 border transition-colors text-left hover:text-black w-fit"
                              style={{
                                borderColor: '#CA6EA7',
                                color: '#AFAF4F',
                                backgroundColor: 'transparent',
                                marginTop: '8px'
                              }}
                              onMouseEnter={(e) => {
                                if (!isSubscribing) {
                                  (e.target as HTMLElement).style.backgroundColor = '#CA6EA7'
                                  (e.target as HTMLElement).style.color = '#000000'
                                }
                              }}
                              onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.backgroundColor = 'transparent'
                                (e.target as HTMLElement).style.color = '#AFAF4F'
                              }}
                            >
                              {isSubscribing ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                            </button>
                            
                            {subscriptionMessage && (
                              <div style={{color: subscriptionMessage.includes('SUCCESS') ? '#AFAF4F' : '#C9383A', marginTop: '4px'}}>
                                {subscriptionMessage}
                              </div>
                            )}
                          </form>
                        </div>
                      )}
                    </div>

                    {/* DISCORD Section */}
                    <div>
                      <a
                        href="https://discord.gg/WsD9334Trn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 border transition-colors text-left hover:text-black ml-6 inline-block"
                        style={{
                          borderColor: '#53539F',
                          color: '#AFAF4F',
                          width: 'fit-content',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = '#53539F'
                          (e.target as HTMLElement).style.color = '#000000'
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent'
                          (e.target as HTMLElement).style.color = '#AFAF4F'
                        }}
                      >
                        [→] DISCORD
                      </a>
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }