import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const CarCard =({car}) => {
  const navigate = useNavigate()
    const currency=import.meta.env.VITE_CURRENCY
  return (
    <motion.div
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    onClick={()=>{navigate(`/car-details/${car._id}`); window.scrollTo(0,0)}}
    className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer'>
      <div className='relative h-48 overflow-hidden'>
        <img src={car.image} alt="car image" className='w-full h-full transition-transform object-cover duration-500 group-hover:scale-105'/>
        {car.isAvailable && <p className='absolute top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full '>Available Now</p>}
        <div className='absolute  bottom-4 right-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-lg'>
        <span className='font-semibold'>{currency}{car.pricePerDay}</span>
        <span className='text-sm text-white/80'> / day</span>

        </div>
      </div>
      <div className='p-4 sm:p-5'>
        <div className='flex justify-between items-start mb-2'>
            <div>
                <h3 className='text-lg font-medium'>{car.brand}{car.model} </h3>
                <p className='text-sm text-muted-foreground'>{car.category} .{car.year}</p>
            </div>
        </div>
        <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600 '>
            <div className='text-sm flex text-muted-foreground items-center'>
                <img src={assets.user_icon} alt="" className='h-4 mr-2'/>
                <span>{car.seating_capacity} Seats</span>
            </div>
            <div className='text-sm flex text-muted-foreground items-center'>
                <img src={assets.fuel_icon} alt="" className='h-4 mr-2'/>
                <span>{car.fuel_type}</span>
            </div>
            <div className='text-sm flex text-muted-foreground items-center'>
                <img src={assets.car_icon} alt="" className='h-4 mr-2'/>
                <span>{car.transmission} </span>
            </div>
            <div className='text-sm flex text-muted-foreground items-center'>
                <img src={assets.location_icon} alt="" className='h-4 mr-2'/>
                <span>{car.location} </span>
            </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CarCard
