import { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const MyBooking = () => {
  const {axios,user,currency}=useAppContext()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if(!user) return

    const fetchMyBookings= async () => {
      try {
        const {data}=await axios.get('/api/bookings/user')
        if(data.success){
          setBookings(data.bookings)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

   fetchMyBookings()
  }, [axios, user])

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm'
    >
      <Title
        title='My Bookings'
        subTitle='View and manage your car bookings'
        align='left'
      />

      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
        }}
        className='space-y-6 mt-10'
      >
        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            variants={{ hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            whileHover={{ y: -3 }}
            className='grid grid-cols-1 lg:grid-cols-[280px_1fr_160px] gap-6 rounded-lg border border-gray-300 p-6 md:p-7'
          >
            <div>
              <img
                src={booking.car.image}
                alt={`${booking.car.brand} ${booking.car.model}`}
                className='w-full h-40 object-cover rounded-md'
              />
              <h2 className='mt-3 text-base font-semibold text-gray-800 uppercase'>
                {booking.car.brand} {booking.car.model}
              </h2>
              <p className='text-gray-500 mt-1'>
                {booking.car.year} &bull; {booking.car.category} &bull; {booking.car.location}
              </p>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <span className='rounded bg-gray-100 px-3 py-1 text-xs text-gray-700'>
                Booking #{index + 1}
                  </span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {booking.status}
                </span>
              </div>

              <div className='flex items-start gap-3'>
                <img src={assets.calendar_icon_colored} alt='Rental period' className='w-4 h-4 mt-1' />
                <div>
                  <p className='text-gray-500'>Rental Period</p>
                  <p className='font-medium text-gray-800'>{booking.pickupDate.split('T')[0]}
                     - {booking.returnDate.split('T')[0]}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <img src={assets.location_icon_colored} alt='Pickup location' className='w-4 h-4 mt-1' />
                <div>
                  <p className='text-gray-500'>Pick-up Location</p>
                  <p className='font-medium text-gray-800'>{booking.car.location}</p>
                </div>
              </div> 
            </div>

            <div className='lg:text-right'>
              <p className='text-gray-500'>Total Price</p>
              <p className='text-2xl font-semibold text-primary'>{currency}{booking.price}</p>
              <p className='text-gray-500 mt-1'>Booked on {booking.createdAt.split('T')[0]}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default MyBooking
