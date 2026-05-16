import Hero from '../components/Hero'
import FeatureSelection from '../components/FeatureSelection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/Newsletter'
import { motion } from 'motion/react'

const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Hero />
      <FeatureSelection />
      <Banner />
      <Testimonial />
      <NewsLetter />
    </motion.main>
  )
}

export default Home
