const router=require("express").Router()

const Booking=require("../models/Booking")
const Listing = require("../models/Listing")
const User = require("../models/User")


router.get("/:userId/trips",async(req,res)=>{
    try{
        const {userId}=req.params
        const trips=await Booking.find({customerId:userId}).populate("customerId hostId listingId")
        res.status(202).json(trips)
    }catch(err){
        console.log(err)
        res.status(404).json({message:"Can not find Trips",error:err.message})
    }
})

// add listing to wishlist
router.patch("/:userId/:listingId",async(req,res)=>{
    try{
        const {userId,listingId}=req.params
        const user =await User.findById(userId)
        const listing= await Listing.findById(listingId).populate("creator")
        const favoriteListing=user.wishList.find((item)=>item._id.toString()===listingId)
        if(favoriteListing){
            user.wishList=user.wishList.filter((item)=>item._id.toString()!==listingId)
            await user.save()
            res.status(200).json({message:"Listing is removed From wishlist",wishList:user.wishList})
        }else{
            user.wishList.push(listing)
            await user.save()
            res.status(200).json({message:"Listing is added to wishlist",wishList:user.wishList})
        }
    }catch(err){
        console.log(err)
        res.status(404).json({error:err.message})

    }
})
router.get("/:userId/properties",async(req,res)=>{
    try{
        const {userId}=req.params
        const properties= await Listing.find({creator:userId}).populate("creator")
        res.status(202).json(properties)
    }catch(err){
        console.log(err)
        res.status(404).json({message:"Cannot Find Properties",error:err.message})

    }
})
router.get("/:userId/reservations",async(req,res)=>{
    try{
        const {userId}=req.params
        console.log(userId)
        const reservations= await Booking.find({hostId:userId}).populate("customerId hostId listingId")
        console.log(reservations)
        res.status(202).json(reservations)
    }catch(err){
        console.log(err)
        res.status(404).json({message:"Cannot Find reservations",error:err.message})

    }
})
module.exports=router