'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'

interface PhotoProps {
  src: string
  alt: string
  className?: string
}

const Photo: React.FC<PhotoProps> = ({ src, alt, className = '' }) => {
  return (
    <motion.div className="relative w-sm aspect-[4/3] rounded-lg overflow-hidden bg-grey shadow-xl"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </motion.div>
  )
}

export default Photo
