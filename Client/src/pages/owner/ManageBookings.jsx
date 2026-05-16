import { useCallback, useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const ManageBookings = () => {
  const {axios,currency,isAuthReady,isOwner}=useAppContext()

  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = useCallback(async () => {
    try {
      const {data}=await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }, [axios])

  const changeBookingStatus = async (bookingId,status) => {
    try {
      const {data}=await axios.post('/api/bookings/change-status',{bookingId,status})
     if(data.success){
      toast.success(data.message)
      fetchOwnerBookings()
     }else{
      toast.error(data.message)
     }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(isAuthReady && isOwner){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchOwnerBookings()
    }
  }, [fetchOwnerBookings, isAuthReady,isOwner])

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='px-4 flex-1 md:px-10 py-10 w-full'
    >
      <Title 
        title='Manage Bookings'
        subTitle='Track all customer bookings, approve or cancel requests, and manage booking statuses'
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
              <th className='px-5 py-5 font-medium max-md:hidden'>Date Range</th>
              <th className='px-5 py-5 font-medium'>Total</th>
              <th className='px-5 py-5 font-medium max-sm:hidden'>Status</th>
              <th className='px-5 py-5 font-medium text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <motion.tr
                key={booking._id}
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='border-b border-gray-200 last:border-b-0'
              >
                <td className='px-5 py-5'>
                  <div className='flex items-center gap-4'>
                    <img
                      src={booking.car?.image}
                      alt={`${booking.car?.brand} ${booking.car?.model}`}
                      className='h-12 w-12 rounded-md object-cover'
                    />
                    <div>
                      <p className='text-base font-medium text-gray-800'>
                        {booking.car.brand} {booking.car.model}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='px-5 py-5 max-md:hidden'>
                  {booking.pickupDate.split('T')[0]} 
                   to {booking.returnDate.split('T')[0]}
                </td>
                <td className='px-5 py-5'>{currency}{booking.price}</td>
                <td className='px-5 py-5 max-sm:hidden'>
                  <span className='rounded-full px-4 py-1.5 text-sm font-medium' >
                    {booking.status}</span>
                </td>
                <td className='p-3'>
                    {booking.status ==='pending' ? (
                        <motion.select
                          whileTap={{ scale: 0.98 }}
                          onChange={e=> changeBookingStatus(booking._id, e.target.value)}
                          value={booking.status}
                          className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'
                        >
                           <option value='pending'>Pending</option> 
                            <option value='cancelled'>Cancelled</option> 
                           <option value='confirmed'>Confirmed</option> 

                        </motion.select>
                    ) :(
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                            {booking.status}</span>
                    )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}

export default ManageBookings
