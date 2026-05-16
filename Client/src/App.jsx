import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetails from './pages/CarDetails'
import MyBooking from './pages/MyBooking'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageBookings from './pages/owner/ManageBookings'
import ManageCars from './pages/owner/ManageCars'
import Login from './components/Login'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'


const App = () => {
  const {showLogin}=useAppContext()
  const isOwnerPath =useLocation().pathname.startsWith('/owner')
  return (
    <>
    <Toaster /> 
    {showLogin && <Login />}
      {! isOwnerPath && <Navbar  />}

      <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/cars' element={<Cars/>} />
        <Route path='/cars/:id' element={<Cars/>} /> 
        <Route path='/car-details/:id' element={<CarDetails/>} /> 
        <Route path='/my-bookings' element={<MyBooking/>} /> 
        <Route path='/owner' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='add-car' element={<AddCar />} />
          <Route path='manage-bookings' element={<ManageBookings />} />
          <Route path='manage-cars' element={<ManageCars />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
