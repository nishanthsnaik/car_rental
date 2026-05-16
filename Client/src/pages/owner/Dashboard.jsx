import { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Dashboard = () => {

  const {axios,isOwner,currency,isAuthReady}=useAppContext()
  const[data,setData]=useState({
    totalCars:0,
    totalBookings:0,
    pendingBookings:0,
    completedBookings:0,
    recentBookings:[],
    monthlyRevenue:0,
  })

  const dashboardCards=[
    {title:"Total Cars",value:data.totalCars,icon:assets.carIconColored},
    {title:"Total Bookings",value:data.totalBookings,icon:assets.listIconColored},
    {title:"Pending ",value:data.pendingBookings,icon:assets.cautionIconColored},
    {title:"Confirmed",value:data.completedBookings,icon:assets.listIconColored},
  ]
  useEffect(()=>{
    if(!isAuthReady || !isOwner){
      return
    }

    const fetchDashboardData=async () => {
      try {
        const {data}=await axios.get('/api/owner/dashboard')
        if(data.success){
          setData(data.dashboardData)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchDashboardData()
  },[axios, isAuthReady,isOwner])
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='px-6 pt-10 md:px-10 flex-1 py-8 '
    >
      <Title title='Admin Dashboard' subTitle='Monitor overall platform performance including total cars, bookings, revenue, and recent activities' />
      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
        }}
        className='grid sm:grid-cols-2 md:grid-cols-4 gap-6 my-8 max-w-3xl'
      >
        {dashboardCards.map((card ,index)=>(
          <motion.div
            key={index}
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            whileHover={{ y: -3 }}
            className='flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor'
          >
            <div>
              <h1 className='text-xs text-gray-500'>{card.title}</h1>
              <p className='text-lg font-semibold'>{card.value} </p>
          </div>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary/10'>
          <img src={card.icon} alt="" className='h-4 w-4'/>
          </div>
          </motion.div>
          ))}
    </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        className='flex flex-wrap items-start gap-6 mb-8 w-full'
      >
        {/* recent book */}
        <motion.div whileHover={{ y: -3 }} className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full'>
          <h1 className='text-lg font-medium'>Recent Bookings</h1>
          <p className='text-gray-500'>Latest customer bookings</p>
          {data.recentBookings.map((booking,index)=>(
        <motion.div
          key={index}
          initial={{ x: -12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className='mt-4 flex items-center justify-between'
        >
          <div className='flex items-center gap-2'>
            <div className='hidden md:flex items-center  justify-center w-12 h-12 rounded-full  bg-primary/10'>
             <img src={assets.listIconColored} alt="" className='h-5 w-5'/>
            </div>
            < div>
              <p>{booking.car.brand} {booking.car.model}</p>
              <p className='text-sm text-gray-500'>{booking.createdAt.split('T')[0]}</p>
            </div>
          </div>
           <div className='flex items-center gap-2 font-medium'>
          <p className='text-sm text-gray-500'>{currency}{booking.price}</p>
          <p className='px-3 py-0.5 border border-borderColor rounded-full text-sm'>{booking.status}</p>  
        </div>
        </motion.div>
        ))}
        </motion.div>
        {/* monthly revenue */}
        <motion.div whileHover={{ y: -3 }} className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs'>
          <h1 className='text-lg font-medium'>Monthly Revenue</h1>
          <p className='text-gray-500'>Revenue for current month</p>
          <p className='text-3xl mt-6 font-semibold'>{currency}{data.monthlyRevenue}</p>
        </motion.div>
      </motion.div>

    </motion.div>

  )
}

export default Dashboard
