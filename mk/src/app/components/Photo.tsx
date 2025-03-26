'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'

interface PhotoProps {
  src: string
  alt: string
  className?: string
  title: string
  subheader: string
}

const Photo: React.FC<PhotoProps> = ({ src, alt, title, subheader, className = '' }) => {
  return (
    <motion.div className="relative w-full bg-grey shadow-xl flex-col justify-end h-fit"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
    >
      <div className='aspect-[4/3] relative'>
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover h-fit w-full${className}`}
          sizes=""
        // style={{height: "fit"}}
        // height={100}
        // width={100}
        />
      </div>

      {/* <div className='text-black font-semibold text-lg'>
        {title}
      </div>
      <div className='text-gray-700'>
        {subheader}
      </div> */}
    </motion.div>
  )
}

export default Photo
