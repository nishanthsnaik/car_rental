import { useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const AddCar = () => {
  const {axios,currency}=useAppContext()
  const [image, setImage] = useState(null)
  const [car,setCar]=useState({
    brand: '',
    model:'',
    year:0,
    pricePerDay:0,
    category:'',
    transmission:'',
    fuel_type:'',
    seating_capacity:'',
    location:'',
    description:'',
  })
  const[isLoading,setIsLoading]=useState(false)
  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    if(isLoading) return null
    setIsLoading(true)
    try {
      const formData=new FormData()
      formData.append('image',image)
      formData.append('carData',JSON.stringify(car))
      const {data}=await axios.post('/api/owner/add-car',formData)
      if(data.success){
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model:'',
          year:0,
          pricePerDay:0,
          category:'',
          transmission:'',
          fuel_type:'',
          seating_capacity:'',
          location:'',
          description:'',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='px-4 flex-1 md:px-10 py-10 '
    >
      <Title
        title='Add New Car'
        subTitle='Fill in details to list a new car for booking, including pricing, availability, and car specifications.'
      />

      <motion.form
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
        }}
        onSubmit={onSubmitHandler}
        className='mt-10 max-w-4xl space-y-7'
      >
        <motion.div
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className='flex flex-col sm:flex-row sm:items-center gap-4'
        >
          <label
            htmlFor='car-image'
            className='w-36 h-20 border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer text-gray-500'
          >
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt='Upload'
              className={image ? 'w-full h-full object-cover' : 'w-8 h-8 opacity-60 cursor-pointer'}
            />
            {!image && <span className='text-xs mt-1'>Upload</span>}
            <input
              id='car-image'
              type='file'
              accept='image/*'
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className='text-lg font-medium text-gray-500'>Upload a picture of your car</p>
        </motion.div>

        {/* car brand &model */}
        <motion.div
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className='grid grid-cols-1 md:grid-cols-2 gap-7'
        >
          <div>
            <label className='block text-base font-medium text-gray-700 mb-2'>Brand</label>
            <input
              type='text'
              placeholder='e.g. BMW, Mercedes, Audi...'
              className='w-full h-13 rounded-md border border-gray-300 px-4 text-gray-700 outline-none focus:border-primary'
              required value={car.brand} 
              onChange={e=> setCar({...car,brand: e.target.value})}/>
          </div>
          <div>
            <label className='block text-base font-medium text-gray-700 mb-2'>Model</label>
            <input
              type='text'
              placeholder='e.g. X5, E-Class, M4...'
              className='w-full h-13 rounded-md border border-gray-300 px-4 text-gray-700 outline-none focus:border-primary'
              required value={car.model} 
              onChange={e=> setCar({...car,model: e.target.value})}
            />
          </div>
        </motion.div>
    {/* car year price category */}
        <motion.div
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'
        >
          <div>
            <label className='block text-base font-medium text-gray-700 mb-2'>Year</label>
            <input
              type='number'
              placeholder='2025'
              className='w-full h-13 rounded-md border border-gray-300 px-4 text-gray-700 outline-none focus:border-primary'
              required value={car.year} 
              onChange={e=> setCar({...car,year: e.target.value})}
            />
          </div>
          <div>
            <label className='block text-base font-medium text-gray-700 mb-2'>Daily Price ({currency}) </label>
            <input
              type='number'
              placeholder='100'
              className='w-full h-13 rounded-md border border-gray-300 px-4 text-gray-700 outline-none focus:border-primary'
              required value={car.pricePerDay} 
              onChange={e=> setCar({...car,pricePerDay: e.target.value})}
            />
          </div>
          <div>
            <label className='block text-base font-medium text-gray-700 mb-2'>Category</label>
            <select className='w-full h-13 rounded-md border border-gray-300 px-4 text-gray-500 outline-none focus:border-primary' onChange={e=>setCar({...car,category: e.target.value})}>
              <option value="">Select a option</option>  
              <option value="Sedan" >Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
          <div>
            <label className='block text-base font-medium text-gray-700 mb-2'>Transmission</label>
            <select className='w-full h-13 rounded-md border border-gray-300 px-4 text-gray-500 outline-none focus:border-primary' onChange={e=>setCar({...car,transmission: e.target.value})}>
              <option value="">Select a option</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div>
            <label className='block text-base font-medium text-gray-700 mb-2'>Fuel Type</label>
            <select className='w-full h-13 rounded-md border border-gray-300 px-4 text-gray-500 outline-none focus:border-primary' onChange={e=>setCar({...car,fuel_type: e.target.value})}>
              <option value="">Select a option</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div>
            <label className='block text-base font-medium text-gray-700 mb-2'>Seating Capacity</label>
            <input
              type='number'
              placeholder='5'
              className='w-full h-13 rounded-md border border-gray-300 px-4 text-gray-700 outline-none focus:border-primary'
              required value={car.seating_capacity} 
              onChange={e=> setCar({...car,seating_capacity: e.target.value})}
            />
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
          <label className='block text-base font-medium text-gray-700 mb-2'>Location</label>
          <input
            type='text'
            placeholder='eg. San Francisco, CA'
            className='w-full h-13 rounded-md border border-gray-300 px-4 text-gray-700 outline-none focus:border-primary'
            required value={car.location} 
              onChange={e=> setCar({...car,location: e.target.value})}
          />
        </motion.div>

        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
          <label className='block text-base font-medium text-gray-700 mb-2'>Description</label>
          <textarea
            placeholder='Describe your car, its condition, and any notable details...'
            className=' w-full h-40 resize-none rounded-md border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-primary'
            required value={car.description} 
              onChange={e=> setCar({...car,description: e.target.value})}
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          className='inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary-dull transition-all cursor-pointer'
        >
          <img src={assets.tick_icon} alt='' className='w-5 h-5 brightness-0 invert' />
          {isLoading ? 'Listing...' : 'List Your Car' }
        </motion.button>
      </motion.form>
     </motion.div>
  )
}

export default AddCar
