import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500"
    >
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="flex flex-col md:flex-row justify-between border-b  gap-8 py-6 border-t border-gray-200"
      >
        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="max-w-sm">
          <motion.img whileHover={{ scale: 1.05 }} src={assets.logo} alt="logo" className='h-8 md:h-9' />
          <p className='max-w-80 mt-3'>
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
          </p>
          <div className="flex items-center gap-2 mt-6">
            <a href="#"><img src={assets.facebook_logo} alt="Facebook" className='w-5 h-5'/></a>
            <a href="#"><img src={assets.instagram_logo} alt="Instagram" className='w-5 h-5'/></a>
            <a href="#"><img src={assets.twitter_logo} alt="Twitter" className='w-5 h-5'/></a>
            <a href="#"><img src={assets.gmail_logo} alt="Email" className='w-5 h-5'/></a>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
          <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><a href="#">Home</a></li>
            <li><a href="#">Browse Cars</a></li>
            <li><a href="#">List Your Car</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </motion.div>

        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
          <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Insurance</a></li>
          </ul>
        </motion.div>

        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
          <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
          <ul className='mt-3 flex flex-col gap-1.5'>
            <li>1234 Luxury Drive</li>
            <li>San Francisco, CA 94107</li>
            <li>+1 234 567 890</li>
            <li>info@example.com</li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
        <ul className='flex items-center gap-4'>
            <li><a href='#'>Privacy </a></li>
            <li>|</li>
            <li><a href='#'>Terms </a></li>
            <li>|</li>
            <li><a href='#'>Cookies </a></li>
        </ul>
      </motion.div>
      
    </motion.footer>
  )
}
  export default Footer
