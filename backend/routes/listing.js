const router=require("express").Router()

const multer=require("multer")


const Listing=require("../models/Listing")
const User=require("../models/User")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/uploads/")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage})
router.post("/create",upload.array("listingPhotos"),async(req,res)=>{
   try{
    const {
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        ameneties,
        title,
        description,
        highlight,
        highlightDesc,
        price,
      } = req.body;
      const listingPhotos=req.files
      if(!listingPhotos){
        return res.status(400).send("No File Uploaded");
      }   
      const listingPhotoPaths=listingPhotos.map((file)=>file.path)
      const newListing = new Listing({
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        ameneties,
        listingPhotoPaths,
        title,
        description,
        highlight,
        highlightDesc,
        price,
      })
      await newListing.save()
      res.status(200).json(newListing)

   }catch(err){
    res.status(409).json({message:"Failed to create listing ",error:err.message})
    console.log(err)
   } 
})
//Get Listings

router.get("/",async(req,res)=>{
    const qCategory=req.query.category
    try{
        let listings
        if(qCategory!="All"){
            listings=await Listing.find({category:qCategory}).populate("creator")
        }else{
            listings=await Listing.find().populate("creator")
        }
        res.status(200).json(listings)

    }catch(err){
        res.status(409).json({message:"Failed to fetch listing ",error:err.message})
        console.log(err)
    }
})

//listing details   
router.get("/:listingId",async(req,res)=>{
    try{
        const {listingId}=req.params
        console.log(listingId)
        const listing = await Listing.findById(listingId).populate("creator")
        console.log(listing)
        res.status(202).json(listing)
    }catch(err){
        res.status(404).json({message:"Listing can not found",error:err.message})

    }
})
module.exports=router