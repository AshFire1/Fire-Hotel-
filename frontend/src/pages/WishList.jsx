import React from "react";
import "../styles/List.scss";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import ListingCard from "../components/ListingCard";
const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <NavBar />
      <h1 className="title-list"> Your Wish List</h1>
      <div className="list">
        {wishList.map(
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

export default WishList;
