import { motion } from 'motion/react'

const Title = ({ title, subTitle }) => {
  return (
    <motion.div
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <h1 className='font-medium text-3xl'> {title}</h1>
      <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-156'>{subTitle}</p>
    </motion.div>
  )
}

export default Title
