import { useCallback, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const ManageCars = () => {
    const {isOwner,axios,currency,isAuthReady}=useAppContext()
  const [cars,setCars]=useState([])
  
  const fetchOwnerCars=useCallback(async()=>{
    try {const {data}=await axios.get('/api/owner/cars')
    if(data.success){
      setCars(data.cars)
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }, [axios])
  const toggleAvailability=async(carId)=>{
    try {
      const {data}=await axios.post('/api/owner/toggle-car',{carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
      } catch (error) {
        toast.error(error.message)
      }
  }
  const deleteCar=async(carId)=>{
    try {
      const confirm=window.confirm('Are you sure you want to delete this car?')
      if(!confirm) return null

      const {data}=await axios.post('/api/owner/delete-car',{carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
      } catch (error) {
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if(isAuthReady && isOwner){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchOwnerCars()
    }
  },[fetchOwnerCars, isAuthReady,isOwner])
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='px-4 flex-1 md:px-10 py-10 w-full'
    >
      <Title 
        title='Manage Cars'
        subTitle='View all listed cars, update their details, or remove them from the booking platform'
      />

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
        className='mt-10 max-w-6xl overflow-hidden rounded-md border border-gray-300'
      >
        <table className='w-full border-collapse text-left text-sm text-gray-700'>
          <thead className='text-base text-gray-500'>
            <tr className='border-b border-gray-300'>
              <th className='px-5 py-5 font-medium'>Car</th>
              <th className='px-5 py-5 font-medium max-md:hidden'>Category</th>
              <th className='px-5 py-5 font-medium'>Price</th>
              <th className='px-5 py-5 font-medium max-sm:hidden'>Status</th>
              <th className='px-5 py-5 font-medium text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car,index) => (
              <motion.tr
                key={index}
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className='border-b border-gray-200 last:border-b-0'
              >
                <td className='px-5 py-5'>
                  <div className='flex items-center gap-4'>
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className='h-12 w-12 rounded-md object-cover'
                    />
                    <div>
                      <p className='text-base font-medium text-gray-800'>
                        {car.brand} {car.model}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {car.seating_capacity} seats &bull; {car.transmission.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='px-5 py-5 max-md:hidden'>{car.category}</td>
                <td className='px-5 py-5'>{currency}{car.pricePerDay}/day</td>
                <td className='px-5 py-5 max-sm:hidden'>
                  <span
                    className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                      car.isAvailable
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {car.isAvailable ? 'Available' : 'UnAvailable'}
                  </span>
                </td>
                <td className='px-5 py-5'>
                  <div className='flex items-center justify-end gap-5'>
                    <button type='button'  
                    onClick={()=> toggleAvailability(car._id)}
                    className='cursor-pointer'>
                      <motion.img whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt='' className='h-13 w-13' />
                    </button>

                    <button onClick={()=> deleteCar(car._id)}  type='button' className='cursor-pointer'>
                      <motion.img whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} src={assets.delete_icon} alt='Delete' className='h-13 w-13' />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}

export default ManageCars
