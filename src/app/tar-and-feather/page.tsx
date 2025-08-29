'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function TarAndFeatherPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = [
    '/Images/TaFChapter1.PNG',
    '/Images/TaFScreenNoChoice.png',
    '/Images/TaFScreenScratch.png',
    '/Images/TaFScreenTitleScreen.png',
    '/Images/TaFSlide37_Walk.png',
    '/Images/TaFSlide41_Billabort.png'
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
              src="/Images/TaFLogo.png" 
              alt="Tar and Feather Logo" 
              className="opacity-92"
              style={{maxHeight: '80px', maxWidth: '300px', objectFit: 'contain'}}
            />
          </div>
          
          {/* Navigation breadcrumb */}
          <div className="text-sm mb-2" style={{color: '#CA6EA7'}}>
            <Link href="/" className="hover:text-white transition-colors">AEONIC MENACE</Link>
            <span> / </span>
            <span style={{color: '#AFAF4F'}}>TAR AND FEATHER</span>
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
                  <div><span style={{color: '#CA6EA7'}}>Genre:</span> Interactive narrative, visual novel</div>
                  <div><span style={{color: '#CA6EA7'}}>Platform:</span> PC, Mac, Linux</div>
                  <div><span style={{color: '#CA6EA7'}}>Status:</span> Now on Steam!</div>
                  <div><span style={{color: '#CA6EA7'}}>Release:</span> 2025</div>
                </div>
              </div>

              {/* Steam Link */}
              <div className="mb-6">
                <a
                  href="https://store.steampowered.com/app/3910540/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border transition-colors inline-block hover:text-black"
                  style={{
                    borderColor: '#53539F',
                    color: '#AFAF4F',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#53539F'
                    e.target.style.color = '#000000'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#AFAF4F'
                  }}
                >
                  [→] GET ON STEAM
                </a>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>DESCRIPTION</h2>
                <div className="flex flex-col gap-3" style={{fontSize: '16px', lineHeight: '1.4'}}>
                  <p>
                    A visual novel about those times your father was tarred and feathered. 
                    Click to advance the story and to unlock hidden secrets. Scratch your dad's head, 
                    remember odd memories, and maybe -- just maybe -- discover what an Australian Tickler is.
                  </p>
                  <p>
                    A little story with pictures about how your father got tarred and feathered.
                    Get lost in the memory with ever-corrupting visuals and an immersive soundscape as you make your way to the emu farm.
                  </p>
                  
                </div>
              </div>
            </div>

            {/* Right Column - Media */}
            <div>
              <h2 className="text-xl mb-3" style={{color: '#CA6EA7'}}>MEDIA</h2>
              <div className="space-y-6">
                
                {/* Trailer */}
                <div>
                  <h3 className="text-lg mb-2" style={{color: '#CA6EA7', fontSize: '16px'}}>TRAILER</h3>
                  <div className="w-full aspect-video">
                    <video 
                      controls
                      className="w-full h-full border"
                      style={{borderColor: '#CA6EA7'}}
                    >
                      <source src="/Images/TaFTrailer.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                {/* Screenshots Carousel */}
                <div>
                  <h3 className="text-lg mb-2" style={{color: '#CA6EA7', fontSize: '16px'}}>SCREENSHOTS</h3>
                  <div className="relative">
                    <div className="w-full aspect-video mb-2">
                      <img 
                        src={images[currentImageIndex]} 
                        alt={`Screenshot ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain border"
                        style={{borderColor: '#CA6EA7'}}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={prevImage}
                        className="px-2 py-1 border transition-colors hover:text-black"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          backgroundColor: 'transparent',
                          fontSize: '12px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#CA6EA7'
                          e.target.style.color = '#000000'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent'
                          e.target.style.color = '#AFAF4F'
                        }}
                      >
                        [←]
                      </button>
                      <span style={{color: '#CA6EA7', fontSize: '12px'}}>
                        {currentImageIndex + 1} / {images.length}
                      </span>
                      <button
                        onClick={nextImage}
                        className="px-2 py-1 border transition-colors hover:text-black"
                        style={{
                          borderColor: '#CA6EA7',
                          color: '#AFAF4F',
                          backgroundColor: 'transparent',
                          fontSize: '12px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#CA6EA7'
                          e.target.style.color = '#000000'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent'
                          e.target.style.color = '#AFAF4F'
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

        {/* Back to Games */}
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
              e.target.style.backgroundColor = '#EFEA53'
              e.target.style.color = '#000000'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = '#AFAF4F'
            }}
          >
            [←] BACK
          </Link>
        </div>
      </div>
    </div>
  )
}