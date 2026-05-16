import { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react'

const Sidebar = () => {
    const {user,axios,fetchUser}= useAppContext();
    const location=useLocation()
    const [image,setImage]=useState('')

    const updateImage=async()=>{
        try {
          const formData=new FormData()
          formData.append('image',image)
          const {data} =await axios.post('/api/owner/update-image',formData)
          if(data.success){
            fetchUser()
            toast.success(data.message)
            setImage('')
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
    }
  return (
    <motion.div
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className='group relative'
      >
        <label htmlFor='image'>
            <img className='h-9 md:h-14 w-9 md:w-14 rounded-full object-cover' src={image ? URL.createObjectURL(image) : user?.image ||  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDnCBNVwV-ex0w_BSjIwrQvRUh3rOk3FRxXjub3jpOlhxwCA1NWdReNi89fuJFdbOzb4D0S8hKHUv-NEHs0MtUsgBk7jnVxFa93BF7h9DwHQ&s=10"} alt="" />
            <input type="file" id='image' accept='image/*' hidden onChange={e=> setImage(e.target.files[0])} />
            <div className=' absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
                <img src={assets.edit_icon} alt="" />

            </div>
        </label>
      </motion.div>
      {image && (
        <motion.button
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileTap={{ scale: 0.96 }}
          onClick={updateImage}
          className='absolute top-0 flex items-center p-2 gap-1 bg-primary/10 text-primary cursor-pointer'
        >
          Save
        <img width={13} src={assets.check_icon} alt=""  />
        </motion.button>
      )}
      <p className='mt-2 text-base max-md:hidden'>
        {user?.name}
      </p>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
        }}
        className='w-full'
      >
{ownerMenuLinks.map((link,index)=>(
    <motion.div
      key={index}
      variants={{
        hidden: { x: -16, opacity: 0 },
        visible: { x: 0, opacity: 1 }
      }}
      transition={{ duration: 0.3 }}
    >
    <NavLink to={link.path} className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${link.path ===location.pathname ? 'bg-primary/10 text-primary' :'text-gray-600'}`}>
        <img src={link.path===location.pathname ? link.coloredIcon : link.icon} alt="car icon" />
        <span className='max-md:hidden'>
            {link.name}
        </span>
        <div className={`${link.path===location.pathname ? 'bg-primary' :''} w-1.5 h-8 rounded-l right-0 absolute`}>
        </div>
    </NavLink>
    </motion.div>
))}
      </motion.div>
    </motion.div>
  )
}

export default Sidebar
