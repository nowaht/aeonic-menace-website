'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LightTheBeaconPage() {
  const [heroesIndex, setHeroesIndex] = useState(0)
  const [mapsIndex, setMapsIndex] = useState(0)
  const [conceptIndex, setConceptIndex] = useState(0)
  
  const heroesImages = [
    '/Images/LtBLineup01.png',
    '/Images/LtBLineup02.png',
    '/Images/LtBTown.jpg',
    '/Images/LtBss1.png',
    '/Images/LtBtown1.png',
    '/Images/LtBtown2.png',
    '/Images/LtBtown3.png'
  ]
  
  const mapsImages = [
    '/Images/LtBboard.png',
    '/Images/LtBWorldMapSmaller.png',
    '/Images/LtBBoard2.png',
    '/Images/LtBenc1.png',
    '/Images/LtBenc2.png',
    '/Images/Ltbenc3.png'
  ]
  
  const conceptImages = [
    '/Images/LtBCon01.jpg',
    '/Images/LtBCon02.jpg',
    '/Images/LtBCon03.jpg',
    '/Images/LtBCon04.jpg',
    '/Images/LtBCon05.jpg',
    '/Images/LtBCon06.jpg',
    '/Images/LtBCon07.jpg',
    '/Images/LtBCon08.jpg',
    '/Images/LtBCon09.png',
    '/Images/LtBCon10.jpg'
  ]

  const nextImage = (type: string) => {
    if (type === 'heroes') {
      setHeroesIndex((prev) => (prev + 1) % heroesImages.length)
    } else if (type === 'maps') {
      setMapsIndex((prev) => (prev + 1) % mapsImages.length)
    } else if (type === 'concept') {
      setConceptIndex((prev) => (prev + 1) % conceptImages.length)
    }
  }

  const prevImage = (type: string) => {
    if (type === 'heroes') {
      setHeroesIndex((prev) => (prev - 1 + heroesImages.length) % heroesImages.length)
    } else if (type === 'maps') {
      setMapsIndex((prev) => (prev - 1 + mapsImages.length) % mapsImages.length)
    } else if (type === 'concept') {
      setConceptIndex((prev) => (prev - 1 + conceptImages.length) % conceptImages.length)
    }
  }
  return (
    <div className="min-h-screen p-4" style={{backgroundColor: '#000000', color: '#AFAF4F', fontFamily: 'var(--font-anonymous-pro)', fontSize: '19px'}}>
      <div className="max-w-4xl ml-8">
        {/* Header with Logo and Navigation */}
        <div className="mb-4">
          <Link href="/" className="inline-block mb-2">
            <img 
              src="/images/Aeonic Menace games White Yellow Logo Design-06.png" 
              alt="Aeonic Menace Games Logo" 
              className="max-w-48 mb-1 opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>
          
          {/* Game Logo */}
          <div className="flex items-center gap-6 mb-4">
            <img 
              src="/Images/LtBlogo2.png" 
              alt="Light the Beacon Logo" 
              className="opacity-100"
              style={{maxHeight: '80px', maxWidth: '300px', objectFit: 'contain'}}
            />
          </div>
          
          {/* Navigation breadcrumb */}
          <div className="text-sm mb-2" style={{color: '#CA6EA7'}}>
            <Link href="/" className="hover:text-white transition-colors">AEONIC MENACE</Link>
            <span> / </span>
            <span style={{color: '#AFAF4F'}}>LIGHT THE BEACON</span>
          </div>
        </div>

        {/* Separator Bar */}
        <div className="mb-6 animate-pulse" style={{borderTop: '1px solid #AFAF4F', width: '600px'}}></div>

        {/* Game Information */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - Game Info */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>GAME INFO</h2>
                <div className="flex flex-col gap-2" style={{fontSize: '16px'}}>
                  <div><span style={{color: '#CA6EA7'}}>Medium:</span> Videogame</div>
                  <div><span style={{color: '#CA6EA7'}}>Genre:</span> Turn-based, party-building, tactical roguelike</div>
                  <div><span style={{color: '#CA6EA7'}}>Platform:</span> PC, Mac, Linux. (Console phase II)</div>
                  <div><span style={{color: '#CA6EA7'}}>Status:</span> Someday...</div> 
                  <div><span style={{color: '#CA6EA7'}}>Developer:</span> Aeonic Menace</div>                  
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>DESCRIPTION</h2>
                <div className="flex flex-col gap-3" style={{fontSize: '16px', lineHeight: '1.4'}}>
                  <p>
                    <b>Light the Beacon</b> blends party-building tactical RPGs with rogue-like elements. 
                    Set in a bizarre world where Hope is the currency and a yeti or an automaton may join your party. 
                    Build your roster from 8 unique hero classes. Equip your party and send them on missions. 
                    Upgrade your town with the loot. <b>Light the Beacon!</b>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>8 Unique Hero Classes (with more planned)</li>
                    <li>Dynamic abilities for a wide variety of strategies</li>
                    <li>100s of unique curses, hexes, and quirks</li> 
                    <li>With customizable combat and rest abilities, every character is truly one-of-a-kind</li>
                    <li>Procedurally generated quests in 8 distinct locations</li>
                    <li>~100 enemies, elites, and bosses specific to their area</li>
                    <li>Nearly 1000 unique items, relics, talismans, & curio</li>
                    <li>100s of unique quest encounters</li>
                    <li>8 different town vendors with tons of upgrade paths</li>
                  </ul>
                  <p>
                  <b>Team:</b>
                  <br></br>Development and Production Lead: Noah Tilsen
                  <br></br>Programmers: Patrick Smith (initial design), Filipe Zanella (contributor), Marcos &quot;Oni&quot; Modolo (contributor)
                  <br></br>Art: Emerson Rabbitt (concepts, characters, scenes)
                  </p>
                  
                  <p style={{color: '#CA6EA7', fontSize: '14px'}}>                    
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Image Carousels */}
            <div>
              <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>MEDIA</h2>
              <div className="space-y-6">
                
                {/* Heroes & Townsfolk Carousel */}
                <div>
                  <h3 className="text-lg mb-2" style={{color: '#CA6EA7', fontSize: '16px'}}>HEROES & TOWNSFOLK</h3>
                  <div className="relative">
                    <div className="w-full aspect-video mb-2">
                      <img 
                        src={heroesImages[heroesIndex]} 
                        alt={`Heroes & Townsfolk ${heroesIndex + 1}`}
                        className="w-full h-full object-contain border"
                        style={{borderColor: '#CA6EA7'}}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => prevImage('heroes')}
                        className="px-2 py-1 border transition-colors hover:text-black"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          backgroundColor: 'transparent',
                          fontSize: '12px'
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
                        [←]
                      </button>
                      <span style={{color: '#CA6EA7', fontSize: '12px'}}>
                        {heroesIndex + 1} / {heroesImages.length}
                      </span>
                      <button
                        onClick={() => nextImage('heroes')}
                        className="px-2 py-1 border transition-colors hover:text-black"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          backgroundColor: 'transparent',
                          fontSize: '12px'
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
                        [→]
                      </button>
                    </div>
                  </div>
                </div>

                {/* Maps and Encounters Carousel */}
                <div>
                  <h3 className="text-lg mb-2" style={{color: '#CA6EA7', fontSize: '16px'}}>MAPS & ENCOUNTERS</h3>
                  <div className="relative">
                    <div className="w-full aspect-video mb-2">
                      <img 
                        src={mapsImages[mapsIndex]} 
                        alt={`Maps & Encounters ${mapsIndex + 1}`}
                        className="w-full h-full object-contain border"
                        style={{borderColor: '#CA6EA7'}}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => prevImage('maps')}
                        className="px-2 py-1 border transition-colors hover:text-black"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          backgroundColor: 'transparent',
                          fontSize: '12px'
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
                        [←]
                      </button>
                      <span style={{color: '#CA6EA7', fontSize: '12px'}}>
                        {mapsIndex + 1} / {mapsImages.length}
                      </span>
                      <button
                        onClick={() => nextImage('maps')}
                        className="px-2 py-1 border transition-colors hover:text-black"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          backgroundColor: 'transparent',
                          fontSize: '12px'
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
                        [→]
                      </button>
                    </div>
                  </div>
                </div>

                {/* Concept Art & Tests Carousel */}
                <div>
                  <h3 className="text-lg mb-2" style={{color: '#CA6EA7', fontSize: '16px'}}>CONCEPT ART & TESTS</h3>
                  <div className="relative">
                    <div className="w-full aspect-video mb-2">
                      <img 
                        src={conceptImages[conceptIndex]} 
                        alt={`Concept Art ${conceptIndex + 1}`}
                        className="w-full h-full object-contain border"
                        style={{borderColor: '#CA6EA7'}}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => prevImage('concept')}
                        className="px-2 py-1 border transition-colors hover:text-black"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          backgroundColor: 'transparent',
                          fontSize: '12px'
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
                        [←]
                      </button>
                      <span style={{color: '#CA6EA7', fontSize: '12px'}}>
                        {conceptIndex + 1} / {conceptImages.length}
                      </span>
                      <button
                        onClick={() => nextImage('concept')}
                        className="px-2 py-1 border transition-colors hover:text-black"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          backgroundColor: 'transparent',
                          fontSize: '12px'
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
                        [→]
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Back */}
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
              (e.target as HTMLElement).style.backgroundColor = '#EFEA53'
              (e.target as HTMLElement).style.color = '#000000'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent'
              (e.target as HTMLElement).style.color = '#AFAF4F'
            }}
          >
            [←] BACK
          </Link>
        </div>
      </div>
    </div>
  )
}