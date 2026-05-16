import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';
import { motion } from 'motion/react'

const NavbarOwner = () => {
  const {user}=useAppContext();
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'
    >
      <div className='flex items-center gap-4'>
        <Link to='/'> 
        <motion.img whileHover={{ scale: 1.05 }} src={assets.logo} className='h-7' alt="" />
        </Link>
        <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.98 }}>
          <Link to='/' className='flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors'>
            <img src={assets.arrow_icon} alt="" className='h-3 rotate-180 opacity-70' />
            <span className='max-sm:hidden'>Back to user page</span>
          </Link>
        </motion.div>
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Welcome, {user?.name || "Owner"}</motion.p>
    </motion.div>
  )
}

export default NavbarOwner
