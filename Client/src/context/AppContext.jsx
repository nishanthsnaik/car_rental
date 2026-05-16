/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
export const AppContext=createContext();
export const AppProvider=({children})=>{

    const navigate=useNavigate();
    const currency =import.meta.env.VITE_CURRENCY
    const [token,setToken]=useState(() => localStorage.getItem('token'))
    const [user,setUser]=useState(null)
    const [isOwner,setIsOwner]=useState(false)
    const [showLogin,setShowLogin]=useState(false)
    const [isAuthReady, setIsAuthReady] = useState(() => !localStorage.getItem('token'))
    const [pickupDate,setPickupDate]=useState('')
    const [returnDate,setReturnDate]=useState('')
    const [cars,setCars]=useState([])

    const fetchUser = useCallback(async () => {
        try {
            const {data}=await axios.get('/api/user/data')
            if(data.success){
                setUser(data.user)
                setIsOwner(data.user.role==='owner')
            }else{
                if(data.message === 'not authorized'){
                    localStorage.removeItem('token')
                    setToken(null)
                    setUser(null)
                    setIsOwner(false)
                    axios.defaults.headers.common['Authorization']=''
                    return
                }
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [navigate])

    //Function to fetch all cars from the server
    const fetchCars=useCallback(async () => {
        try {
            const {data}=await axios.get('/api/user/cars')
            if(data.success){
                setCars(data.cars)
            }else if(data.message !== 'not authorized'){
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [])

    //function to logout the user
    const logout =()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        setIsAuthReady(true)
        axios.defaults.headers.common['Authorization']=''
        toast.success('You have been logged out')
    }

    //useEffect to retrieve the token from localStorage
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization'] = token
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCars()
    },[fetchCars, token])

    //useEffect to fetch user data when token is available
    useEffect(()=>{
        if(!token){
            return
        }
        axios.defaults.headers.common['Authorization']=token
        const loadUser = async () => {
            await fetchUser()
            setIsAuthReady(true)
        }
        loadUser()
    },[fetchUser, token])
    const value={
        navigate,currency,axios,user,setUser,token,setToken,isOwner,setIsOwner,fetchUser,showLogin,setShowLogin,logout,fetchCars,cars,setCars,pickupDate,setPickupDate,returnDate,setReturnDate,isAuthReady
 
    }
 
    return( 
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    return useContext(AppContext)
}
