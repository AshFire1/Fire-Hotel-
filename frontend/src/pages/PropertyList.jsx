import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import ListingCard from "../components/ListingCard";
import { useDispatch } from "react-redux";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
const PropertyList = () => {
    const[loading,setLoading]=useState(true)
  const user = useSelector((state) => state.user);
  const propertyList=user?.propertyList
  const dispatch=useDispatch()
  const getPropertyList=async()=>{
    try{
        const response=await fetch(`http://localhost:3001/users/${user._id}/properties`,{
            method:"GET"
        })
        const data=await response.json()
        dispatch(setPropertyList(data))
        setLoading(false) 
    }catch(err){
        console.log("Fetch properties failed",err.message)
    }
  }
  useEffect(()=>{
    getPropertyList()

  },[])

  return loading? <Loader/>:(
    <>
      <NavBar />
      <h1 className="title-list"> Your Property List</h1>
      <div className="list">
        {propertyList.map(
          ({
            _id,
            listingPhotoPaths,
            creator,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard 
            listingId={_id}
            listingPhotoPaths={listingPhotoPaths}
            city={city}
            creator={creator}
            province={province} 
            category={category}
            price={price}
            booking={booking}
            country={country}/>
          )
        )}
      </div>
    </>
  );
};

export default PropertyList;
