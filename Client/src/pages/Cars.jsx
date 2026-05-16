import { useEffect, useMemo, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Cars = () => {
  const {cars,axios}=useAppContext()
   
  const [searchParams]=useSearchParams()
  const pickupLocation=searchParams.get('pickupLocation')
  const pickupDate=searchParams.get('pickupDate')
  const returnDate=searchParams.get('returnDate')

  const [input,setInput]=useState('')

  const isSearchData=pickupLocation && pickupDate && returnDate
  const [availableCars,setAvailableCars]=useState([])

  const filteredCars = useMemo(() => {
    if(input===''){
      return cars
    }
    return cars.slice().filter((car)=>{
        return car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) || car.category.toLowerCase().includes(input.toLowerCase()) || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
  }, [cars, input])

  useEffect(()=>{
    if(!isSearchData) return

    const searchCarAvailability=async () => {
      try {
        const {data}=await axios.post('/api/bookings/check-availability',{location:pickupLocation,pickupDate,returnDate})
        if(data.success){
          setAvailableCars(data.availableCars)
          if(data.availableCars.length===0){
            toast('No cars Available')
          }
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    searchCarAvailability()
  },[axios, isSearchData, pickupDate, pickupLocation, returnDate])

  const carsToShow = isSearchData ? availableCars : filteredCars
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='flex flex-col items-center py-20 bg-light max-md:px-4'
      >
        <Title title="Available Cars" subTitle="browse our selection of premium vehicles available for your next adventure"/>
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'
        >
          <img src={assets.search_icon} alt=""  className='w-4.5 h-4.5 mr-2'/>
          <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Search bt make ,model or features' className='w-full h-full outline-none text-gray-500' />
          <img src={assets.filter_icon} alt=""  className='w-4.5 h-4.5 mr-2'/>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className='text-gray-500 xl:px-20 max-w-7xl mx-auto'
        >
          Showing {carsToShow.length} Cars
        </motion.p>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
          }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'
        >
          {carsToShow.map((car,index)=>(
            <motion.div
              key={index}
              variants={{ hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Cars
