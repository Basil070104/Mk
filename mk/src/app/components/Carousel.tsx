// carousel.tsx
'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const Carousel = ({
  data,
}: {
  data: {
    image: string
  }[]
}) => {
  const [currentImg, setCurrentImg] = useState(0)

  const nextSlide = () => {
    setCurrentImg((prev) => (prev + 1) % data.length)
  }

  const prevSlide = () => {
    setCurrentImg((prev) => (prev - 1 + data.length) % data.length)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Carousel container */}
      <div className="relative h-80 overflow-hidden rounded-md">
        {/* Image container */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${(currentImg * (33.333 / 3))}%)`,
            width: `${data.length * 33.333}%`
          }}
        >
          {/* Map through data to render images */}
          {data.map((v, i) => (
            <div
              key={i}
              className="w-1/3 p-2"
            >
              <div className="relative h-60 transition-opacity duration-300">
                <Image
                  className={`object-cover rounded-md transition-opacity duration-300 ${i === currentImg ? 'opacity-100' : 'opacity-50'
                    }`}
                  alt={`carousel-image-${i}`}
                  fill
                  src={v.image || 'https://random.imagecdn.app/500/500'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-3 flex justify-center gap-4">
        <button
          onClick={prevSlide}
          className="border px-4 py-2 font-bold hover:bg-gray-100"
        >
          {'<'}
        </button>
        <button
          onClick={nextSlide}
          className="border px-4 py-2 font-bold hover:bg-gray-100"
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default Carousel