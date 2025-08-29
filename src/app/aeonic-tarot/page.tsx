'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AeonicTarotPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = [
    '/Images/AeonicTarot.png',
    '/Images/AenoicBridgeSize-58.png',
    '/Images/AeonicTarotSize-02.png',
    '/Images/AenoicBridgeSize-01.png',
    '/Images/AeonicTarotSize-36.png',
    '/Images/AenoicBridgeSize-16.png',
    '/Images/AeonicTarotSize-48.png',
    '/Images/AeonicTarotSize-50.png',
    '/Images/AenoicBridgeSize-45.png',
    '/Images/AeonicTarotSize-63.png',
    
    
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
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
              src="/Images/AeonicTitleW.png" 
              alt="Aeonic Tarot Logo" 
              className="opacity-92"
              style={{maxHeight: '80px', maxWidth: '300px', objectFit: 'contain'}}
            />
          </div>
          
          {/* Navigation breadcrumb */}
          <div className="text-sm mb-2" style={{color: '#CA6EA7'}}>
            <Link href="/" className="hover:text-white transition-colors">AEONIC MENACE</Link>
            <span> / </span>
            <span style={{color: '#AFAF4F'}}>AEONIC TAROT</span>
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
                <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>DECK INFO</h2>
                <div className="flex flex-col gap-2" style={{fontSize: '16px'}}>
                  <div><span style={{color: '#CA6EA7'}}>Medium:</span> Cards</div>
                  <div><span style={{color: '#CA6EA7'}}>Genre:</span> Oracle deck</div>
                  <div><span style={{color: '#CA6EA7'}}>Cards:</span> 64 cards</div>
                  <div><span style={{color: '#CA6EA7'}}>Status:</span> Limited supply</div>                  
                </div>
              </div>

              {/* Purchase Info */}
              <div className="mb-6">
                <div 
                  className="px-4 py-2 border"
                  style={{
                    borderColor: '#CA6EA7',
                    color: '#CA6EA7',
                    backgroundColor: 'transparent'
                  }}
                >
                  CONTACT FOR AVAILABILITY
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>DESCRIPTION</h2>
                <div className="flex flex-col gap-3" style={{fontSize: '16px', lineHeight: '1.4'}}>
                  <p>
                    Æonic Tarot, a wholly unique oracle deck with 64 cards. While it is different from
                    traditional tarot, you will still find some similarities,
                    such as a strong connection to the four elements; and
                    even though it is quite novel, there is a sturdy
                    and cohesive logic that lends itself for intuitive
                    cartomancy. 

                  </p>
                  <p>
                    The Aeonic Tarot presents a fresh perspective on divination, 
                    offering guidance for navigating the complexities of contemporary life 
                    while honoring timeless spiritual principles.
                  </p>
                  <p>
                    Each card invites deep contemplation and personal reflection. Perfect for 
                    both experienced readers and those new to oracle work.
                  </p>
                  <p>
                    Also includes instructions for Aeonic Poker! A poker variant with a unique twist. 
                  </p>
                  <p style={{color: '#CA6EA7', fontSize: '14px'}}>
                    Limited edition run. Available in bridge size and tarot size decks. Tarot sized deck comes with a detailed guidebook 
                    explaining the symbolism and suggested meaning. Images vary based on deck size.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Image Carousel */}
            <div>
              <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>CARD GALLERY</h2>
              <div className="relative">
                {/* Main Image Display */}
                <div className="w-full aspect-[3/4] mb-4">
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`Aeonic Tarot Card ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain border"
                    style={{borderColor: '#CA6EA7'}}
                  />
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={prevImage}
                    className="px-3 py-1 border transition-colors hover:text-black"
                    style={{
                      borderColor: '#CA6EA7',
                      color: '#AFAF4F',
                      backgroundColor: 'transparent',
                      fontSize: '14px'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = '#CA6EA7';
                      (e.target as HTMLElement).style.color = '#000000'
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.color = '#AFAF4F'
                    }}
                  >
                    [←] PREV
                  </button>
                  
                  <span style={{color: '#CA6EA7', fontSize: '14px'}}>
                    {currentImageIndex + 1} / {images.length}
                  </span>
                  
                  <button
                    onClick={nextImage}
                    className="px-3 py-1 border transition-colors hover:text-black"
                    style={{
                      borderColor: '#CA6EA7',
                      color: '#AFAF4F',
                      backgroundColor: 'transparent',
                      fontSize: '14px'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = '#CA6EA7';
                      (e.target as HTMLElement).style.color = '#000000'
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.color = '#AFAF4F'
                    }}
                  >
                    NEXT [→]
                  </button>
                </div>
                
                {/* Thumbnail Navigation */}
                <div className="grid grid-cols-5 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="aspect-square border transition-opacity hover:opacity-100"
                      style={{
                        borderColor: currentImageIndex === index ? '#EFEA53' : '#CA6EA7',
                        opacity: currentImageIndex === index ? 1 : 0.6
                      }}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Games */}
        <div className="mt-8">
          <Link
            href="/"
            className="px-3 py-1 border transition-colors text-left hover:text-black inline-block"
            style={{
              borderColor: '#CA6EA7',
              color: '#AFAF4F',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#CA6EA7';
              (e.target as HTMLElement).style.color = '#000000'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
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