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

  return (
    <div>
      {/* Landing */}
      <div className={styles.landing}>
        <div className={styles.text_container}>
          <div>
            <div className={styles.landing_text}>
              Mk.
            </div>
            <div className={styles.line_landing}></div>
          </div>
        </div>
        <div className={styles.landing_image_container}>
          <Image
            src="/images/hot_matt.png"
            alt="matthew"
            className={styles.landing_image}
            width={800} // Add required width for Next.js Image
            height={500} // Add required height for Next.js Image
          />
        </div>
      </div>

      {/* Photos */}
      <div>
        <div className={styles.parallax_image}
        >
          <div>
            <motion.div
              className={styles.parallax_text}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={variants}
            >
              He an thing rapid these after going drawn or. Timed she his law the spoil round defer.
              In surprise concerns informed betrayed he learning is ye. Ignorant formerly so ye blessing.
              He as spoke avoid given downs money on we. Of properly carriage shutters ye as wandered up repeated moreover.
              Inquietude attachment if ye an solicitude to. Remaining so continued concealed as knowledge happiness.
              Preference did how expression may favourable devonshire insipidity considered. An length design regret an hardly barton mr figure.
            </motion.div>
            <div className="p-10">
              <div className="flex justify-around m-10">
                <Photo
                  src="/images/face.png"
                  alt="temp image"
                />
                <Photo
                  src="/images/face.png"
                  alt="temp image"
                />
                <Photo
                  src="/images/face.png"
                  alt="temp image"
                />
              </div>
              <div className="flex justify-around m-10">
                <Photo
                  src="/images/face.png"
                  alt="temp image"
                />
                <Photo
                  src="/images/face.png"
                  alt="temp image"
                />
                <Photo
                  src="/images/face.png"
                  alt="temp image"
                />
              </div>

            </div>
          </div>
        </div>
      </div>


      {/* Videos */}
      <div className={styles.videos}>
        <div className={styles.videos_text}>
          <div>
            Videos
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
