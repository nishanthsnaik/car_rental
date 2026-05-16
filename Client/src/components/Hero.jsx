import { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react' 

const Hero = () => {
  const navigate = useNavigate()
    const [pickupLocation,setPickupLocation]=useState('')
    const {pickupDate,setPickupDate,returnDate,setReturnDate}=useAppContext()
    const handleSearch = (e) => {
      e.preventDefault()
      navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
  }
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration: 0.8}}
    className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
      <motion.h1
      initial={{y:50,opacity:0}}
      animate={{y:0,opacity:1}}
      transition={{duration: 0.8,delay:0.2}}
      className='text-4xl md:text-5xl font-semibold'>Luxury Cars on Rent</motion.h1>
      <motion.form 
      initial={{scale:0.95,opacity:0,y:50}}
      animate={{y:0,opacity:1,scale:1}}
      transition={{duration: 0.6,delay:0.4}}
      onSubmit={handleSearch} className='flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-4xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
        <div className='flex flex-col md:flex-row items-start md:items-center gap-4 w-full'>
          <div className='flex flex-col items-start gap-2 min-w-[220px]'>
            <label htmlFor='pickup-location'>Pickup Location</label>
            <select
              id='pickup-location'
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className='w-30 text-sm text-gray-700'
            >
              <option value=''>Select location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className='px-1 text-sm text-gray-500'>
              {pickupLocation ? pickupLocation : 'Please select location'}
            </p>
          </div>

          <div className='flex flex-col items-start gap-2 min-w-[200px]'>
            <label htmlFor='pickup-date'>Pick-up Date</label>
            <input
              type='date'
              value={pickupDate} onChange={e=>setPickupDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className='text-sm text-gray-700'
              required
            />
          </div>

          <div className='flex flex-col items-start gap-2 min-w-[200px]'>
            <label htmlFor='return-date'>Return Date</label>
            <input
              type='date'
              value={returnDate} onChange={e=>setReturnDate(e.target.value)}
              className='text-sm text-gray-700'
              required
            />
          </div>
        </div>

        <motion.button 
        whileHover={{scale:1.05}}
        whileTap={{scale:1.05}}
        className='flex items-center justify-center gap-1 px-15 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'>
          <img 
          src={assets.search_icon} 
          alt='search' 
          className='brightness-300' />
          Search
        </motion.button>
      </motion.form>
      <motion.img 
      initial={{y:100,opacity:0}}
      animate={{y:0,opacity:1}}
      transition={{duration: 0.8,delay:0.6}}
      src={assets.main_car} alt='car' className='max-h-96' />
    </motion.div>
  )
}

export default Hero
