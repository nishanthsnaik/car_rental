import Title from './Title'
import CarCard from './CarCard'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const FeatureSelection = () => {

    const navigate=useNavigate()
    const{cars}=useAppContext()

  return (
    <motion.div 
    initial={{y:40,opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{duration:1,ease:'easeOut'}}
    className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
      <motion.div
      initial={{y:20,opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{duration:1,delay:0.5}}>
        <Title
          title='Featured Vehicles'
          subTitle='Explore our selection of premium vehicles available for your next adventure'
        />
      </motion.div>

      <motion.div 
      initial={{y:100,opacity:0}}
    whileInView={{y:0,opacity:1}}
    transition={{duration:0.5,delay:0.5}}
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {cars.slice(1,6).map((car) => (
          <motion.div 
          initial={{scale:0.95,y:100,opacity:0}}
          whileInView={{scale:1,y:0,opacity:1}}
          transition={{duration:0.4,delay:0.5,ease:'easeOut'}}
          key={car._id} >
            <CarCard car={car}/>
          </motion.div>
        ))}
      </motion.div>
      <motion.button 
        initial={{scale:0.95,y:20}}
        whileInView={{scale:1,y:0}}
        transition={{duration:0.4,delay:0.3}}
        
      onClick={()=> {
        navigate('/cars'); scrollTo(0,0)
      }}
      className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
        Explore all cars <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>
      </motion.div>   
    )
}
export default FeatureSelection