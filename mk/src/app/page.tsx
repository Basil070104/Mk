'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "./components/Carousel";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Photo from "./components/Photo";

const DATA = [
  { image: '/images/face.png' },
  { image: '/images/hot_matt.png' },
  { image: '/images/josh.png' },
  { image: '/images/light.png' },
  { image: '/images/stage.png' },
  { image: '/images/val.png' }
]

export default function Home() {

  const ref = useRef(null);
  const inView = useInView(ref)

  const changeSlide = (n: number) => {
    console.log(`Changing slide by ${n}`);
  };

  const variants = {
    hidden: {
      y: 50,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    }
  };

  const [isSticky, setIsSticky] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const [appear, isAppear] = useState(false)

  const mkRef = useRef(null);
  const view = useInView(mkRef);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current && videosRef.current) {
        const parallaxBottom = parallaxRef.current.getBoundingClientRect().bottom;
        const videosTop = videosRef.current.getBoundingClientRect().top;

        if (parallaxBottom > videosTop) {
          setIsSticky(false);
        } else {
          setIsSticky(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Sticky Bar */}
      <div className="sticky top-0 z-50 bg-white pt-4 px-4">
        <div className="flex justify-between items-center">

          {!view && (
            <motion.h1
              className="text-xl font-bold whitespace-nowrap"
              initial={{ opacity: 0, y: -20 }} // Initial state
              animate={{ opacity: 1, y: 0 }} // Animate to this state
              transition={{ duration: 0.5 }} // Duration of the animation
            >
              matthew kurniawan
            </motion.h1>
          )}

          <nav className="flex space-x-4 items-end w-full justify-end">
            <a href="#section1" className="text-gray-700 hover:text-gray-500">Cinematography</a>
            <a href="#section2" className="text-gray-700 hover:text-gray-500">Photography</a>
            <a className="text-gray-700 hover:text-gray-500">Chicago, IL</a>
          </nav>
        </div>
        <div className="border-b border-gray-300 mt-4" />
      </div>

      {/* Landing */}
      <div className={styles.landing}>
        <div className={styles.text_container}>

          <div className={styles.landing_text} ref={mkRef}>
            mk.
          </div>
        </div>
        <div className={styles.landing_image_container}>
          <Image
            src="/images/matt.png"
            alt="matthew"
            className={styles.landing_image}
            width={800} // Add required width for Next.js Image
            height={500} // Add required height for Next.js Image
          />
        </div>
      </div>

      {/* Photos */}
      <div>
        <div className={`${styles.parallax_image} ${isSticky ? 'sticky top-0 z-10' : ''}`}
          ref={parallaxRef}
        >
          <div className="w-full h-fit">
            <div className="flex w-full justify-center align-middle">
              <motion.div
                className={`${styles.parallax_text} overflow-hidden`}
                animate={{
                  y: [0, 10, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6667 6L8.00001 10.6667L3.33334 6" stroke="#0C0C0C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </motion.div>
            </div>
            {/* <div className="w-1/2 h-1/2">

            </div> */}
            {/* <div className="p-10 w-full">
              <div className="flex justify-around my-10 w-full">
                <Photo
                  src="/images/theatre.jpg"
                  alt="temp image"
                />
                <Photo
                  src="/images/vancouver.jpg"
                  alt="temp image"
                />
                <Photo
                  src="/images/matt_arms.png"
                  alt="temp image"
                />
              </div>
              <div className="flex justify-around my-10">
                <Photo
                  src="/images/val_sit.jpg"
                  alt="temp image"
                />
                <Photo
                  src="/images/lake.jpg"
                  alt="temp image"
                />
                <Photo
                  src="/images/bridge.jpg"
                  alt="temp image"
                />
              </div>
              <div className="flex justify-around my-10">
                <Photo
                  src="/images/hands.jpg"
                  alt="temp image"
                />
                <Photo
                  src="/images/val_eyes.jpg"
                  alt="temp image"
                />
                <Photo
                  src="/images/skyline.jpg"
                  alt="temp image"
                />
              </div>
            </div> */}

            {/* Bento Grid */}
            <div className="flex justify-center items-center w-full mb-5">
              <div className={styles.grid} >

                <div className={styles.box} style={{ gridArea: "box-1" }}>
                  <Photo
                    src="/images/skyline.jpg"
                    alt="temp image"
                    title="skyline"
                    subheader="Photo"
                  />
                </div>
                <div className={styles.box} style={{ gridArea: "box-2" }}>
                  <Photo
                    src="/images/theatre.jpg"
                    alt="temp image"
                    title="person"
                    subheader="Photo"
                  />
                </div>
                <div className={styles.box} style={{ gridArea: "box-3" }}>
                  <Photo
                    src="/images/val_eyes.jpg"
                    alt="temp image"
                    title="person"
                    subheader="Photo"
                  />
                </div>
                <div className={styles.box} style={{ gridArea: "box-4" }}>
                  <Photo
                    src="/images/hands.jpg"
                    alt="temp image"
                    title="person"
                    subheader="Photo"
                  />
                </div>
                <div className={styles.box} style={{ gridArea: "box-5" }}>
                  <Photo
                    src="/images/bridge.jpg"
                    alt="temp image"
                    title="person"
                    subheader="Photo"
                  />
                </div>
                <div className={styles.box} style={{ gridArea: "box-6" }}>
                  <Photo
                    src="/images/light.png"
                    alt="temp image"
                    title="person"
                    subheader="Photo"
                  />
                </div>
                <div className={styles.box} style={{ gridArea: "box-7" }}>
                  <Photo
                    src="/images/matt_arms.png"
                    alt="temp image"
                    title="person"
                    subheader="Photo"
                  />
                </div>
                <div className={styles.box} style={{ gridArea: "box-8" }}>
                  <Photo
                    src="/images/matt_fog.jpg"
                    alt="temp image"
                    title="person"
                    subheader="Photo"
                  />
                </div>
                <div className={styles.box} style={{ gridArea: "box-9" }}>
                  <Photo
                    src="/images/lake.jpg"
                    alt="temp image"
                    title="person"
                    subheader="Photo"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


      {/* Videos */}
      <div className={styles.videos}
        ref={videosRef}
      >
        <div className={styles.videos_text}>
          <div>
            Cinematography.
          </div>
          <div className={styles.videos_line}></div>
        </div>
        {/* <div>
          <div className={styles.filter}>
            <div className={styles.tag}>
              All
            </div>
            <div className={styles.tag}>
              Short Film
            </div>
            <div className={styles.tag}>
              Writing
            </div>
            <div className={styles.tag}>
              Something?
            </div>
            <div className={styles.tag}>
              Dance
            </div>
          </div>
        </div> */}
        <Carousel data={DATA} />
        <Carousel data={DATA} />
      </div>

      <div className="w-full h-0.5 bg-gray-200 px-0.5">

      </div>
      {/* Contact */}
      <div className={styles.footer}>
        <div className={styles.footer_container}>
          <h2>Contact Me</h2>
          <p>If you have any questions, feel free to reach out!</p>
          <ul className={styles.contact_info}>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:info@example.com">info@example.com</a>
            </li>
            <li>
              <strong>Phone:</strong>{' '}
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </li>
            {/* <li><strong>Address:</strong> 123 Main St, Anytown, USA</li> */}
          </ul>
          <div>
            Created by Basil Khwaja.
          </div>
        </div>
      </div>
    </div>
  );
}
