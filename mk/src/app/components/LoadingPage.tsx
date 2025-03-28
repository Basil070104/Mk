import { motion } from 'framer-motion'

const LoadingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.2,
        transition: {
          duration: 1,
          ease: "easeInOut"
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
    >
      <motion.div
        className="flex flex-col items-center justify-center space-y-4"
        initial={{
          scale: 0.8,
          opacity: 0
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 1,
            ease: "easeInOut"
          }
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          transition: {
            duration: 1,
            ease: "easeInOut"
          }
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1
            }
          }}
          exit={{
            opacity: 0,
            y: 20,
            transition: {
              duration: 1
            }
          }}
          className="text-2xl font-bold tracking-widest uppercase"
        >
          mk.
        </motion.h1>
      </motion.div>
    </motion.div>
  )
}

export default LoadingPage