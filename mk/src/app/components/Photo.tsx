'use client'
import Image from 'next/image'
import React from 'react'

interface PhotoProps {
  src: string
  alt: string
  className?: string
}

const Photo: React.FC<PhotoProps> = ({ src, alt, className = '' }) => {
  return (
    <div className="relative w-sm aspect-[4/3] rounded-lg overflow-hidden bg-grey shadow-xl">
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}

export default Photo
