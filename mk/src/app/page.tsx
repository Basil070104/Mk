'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "./components/Carousel";
import { motion, useInView, AnimatePresence, useScroll, useSpring } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Photo from "./components/Photo";
import { style } from "motion/react-client";
// import { Fade, Slide } from "react-awesome-reveal"

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
  const cinema = useRef(null)

  const handleClick = () => {
    cinema.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

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
      <motion.div className="fixed left-7 top-20 bg-gray-300 w-0.5 h-2/3 origin-left" style={{ scaleY, transformOrigin: 'top' }}>

      </motion.div>
      {/* Sticky Bar */}
      <div className="sticky top-0 z-50 bg-white pt-4 px-4">
        <div className="flex justify-between items-center text-xl">
          <AnimatePresence>
            {!view && (
              <motion.h1
                className=" font-bold whitespace-nowrap"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, y: -20 }}
              >
                matthew kurniawan
              </motion.h1>
            )}
          </AnimatePresence>


          <nav className={`flex space-x-4 items-end w-full justify-end ${styles.nav}`}>
            <div className="text-gray-700 hover:text-gray-500 hover:cursor-pointer" onClick={handleClick}>Cinematography</div>
            {/* <a href="#section2" className="text-gray-700 hover:text-gray-500">Photography</a> */}
            <a className="text-gray-700 hover:text-gray-500">Chicago, IL</a>
          </nav>
        </div>
        <div className="border-b border-gray-300 mt-4" />
      </div>

      {/* Landing */}
      <div className={styles.landing}>
        <div className={styles.text_container}>

          <div className={styles.info}>
            I'm a Chicago-based filmmaker <br />with a love for interactive media, <br />user experience, and design ⊹₊ ⋆
          </div>

          <div className={styles.landing_text} ref={mkRef}>
            <div>
              matthew
            </div>
            <div>
              kurniawan
            </div>
          </div>
        </div>
        <motion.div className={styles.landing_image_container}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/matt.png"
            alt="matthew"
            className={styles.landing_image}
            width={800} // Add required width for Next.js Image
            height={500} // Add required height for Next.js Image
          />
        </motion.div>
      </div>

      {/* Photos */}
      <div id="Cinematography" ref={cinema}>
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
                  <path d="M12.6667 6L8.00001 10.6667L3.33334 6" stroke="#0C0C0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

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
                    src="/images/stage.png"
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
                <div className={styles.box} style={{ gridArea: "box-10" }}>
                  <Photo
                    src="/images/matt_arms.png"
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
      {/* <div className={styles.videos}
        ref={videosRef}
      >
        <div className={styles.videos_text}>
          <div>
            Cinematography.
          </div>
          <div className={styles.videos_line}></div>
        </div>
        <Carousel data={DATA} />
        <Carousel data={DATA} />
      </div> */}

      <div className="w-full h-0.5 bg-gray-200 px-0.5">

      </div>
      {/* Contact */}
      <div className={styles.footer}>
        <div className={styles.footer_container}>
          <div className={styles.contact_info}>

            <div className="text-left px-4 underline underline-offset-2">
              <div><a href="https://www.instagram.com/mqtt.k/?utm_source=ig_web_button_share_sheet" target="_blank">Instagram</a></div>


              <div> <a href="https://www.youtube.com/@mattkrnwn" target="_blank">Youtube</a></div>
            </div>

            <div className="flex flex-col text-left px-4">
              <div>
                Let's make something together.
              </div>
              <div className="underline underline-offset-2">
                mattkrnwn@gmail.com
              </div>
            </div>

          </div>

          <div>
            Created by <a className="underline underline-offset-2" href="https://www.instagram.com/basil_k07/" target="_blank">Basil Khwaja</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
