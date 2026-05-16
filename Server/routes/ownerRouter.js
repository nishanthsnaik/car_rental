import express from "express";
import { protect } from "../middleware/auth.js";
import {addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailablility, updateUserImage} from "../controllers/ownerController.js"
import upload from '../middleware/multer.js';

const ownerRouter=express.Router();


ownerRouter.post("/change-role",protect,changeRoleToOwner)
ownerRouter.post("/add-car",protect,upload.single("image"),addCar)
ownerRouter.get("/cars",protect,getOwnerCars)
ownerRouter.post("/toggle-car",protect,toggleCarAvailablility)
ownerRouter.post("/delete-car",protect,deleteCar)

ownerRouter.get('/dashboard',protect,getDashboardData)
ownerRouter.post('/update-image',protect,upload.single("image"),updateUserImage)

export default ownerRouter;
