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
      {/* Landing */}
      <div className={styles.landing}>
        <div className={styles.text_container}>
          <div className="h-full flex flex-col justify-between flex-wrap">
            <div className="font-bold">
              created by Basil Khwaja
            </div>
            <div>
              <div className={styles.landing_text}>
                Mk.
              </div>
              <div className={styles.line_landing}></div>
            </div>
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
          <div className="w-full">
            <div className="flex w-full justify-center align-middle">
              <motion.div
                className={`${styles.parallax_text} overflow-hidden`}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
              >
                Photography
              </motion.div>
            </div>
            <div className="py-10">

            </div>
            <div className="p-10 w-full">
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
                  src="/images/face.png"
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
            Cinematography
          </div>
          <div className={styles.videos_line}></div>
        </div>
        <div>
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
        </div>
        <Carousel data={DATA} />
        <Carousel data={DATA} />
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
