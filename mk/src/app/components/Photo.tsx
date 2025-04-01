'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

interface PhotoProps {
  src: string
  alt: string
  className?: string
  title: string
  subheader: string
  video?: boolean
}

const Photo: React.FC<PhotoProps> = ({ src, alt, title, subheader, video = false, className = '' }) => {
  return (
    <motion.div className="relative w-full bg-grey flex flex-col " style={{ height: '100%' }}>
      <motion.div
        className='relative flex-grow'
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
        style={{ paddingBottom: video ? '0' : '75%' }}
      >
        {video ? (
          <video loop autoPlay muted className={`object-cover w-full ${className}`}>
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover w-full ${className}`}
            sizes="100vw"
          />
        )}
      </motion.div>

      <div className='flex-shrink-0 h-fit p-2'>
        <div className='text-black font-semibold text-2xl'>
          {title}
        </div>
        <div className='text-gray-700 text-xl'>
          {subheader}
        </div>
      </div>
    </motion.div>
  )
}

export default Photo
