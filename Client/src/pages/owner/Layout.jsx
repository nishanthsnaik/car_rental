import { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { motion } from 'motion/react'

const Layout = () => {
  const {isOwner,navigate,isAuthReady}=useAppContext()
  useEffect(()=>{
    if(isAuthReady && !isOwner){
      navigate('/')
    }
  },[isAuthReady, isOwner, navigate])

  return (
    <div className='flex flex-col'>
      <NavbarOwner />
      <div className='flex'>
        <Sidebar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className='flex-1'
        >
          <Outlet />
        </motion.main>
      </div>
      
    </div>
  )
}

export default Layout
