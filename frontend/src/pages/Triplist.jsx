import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
const Triplist = () => {
  const tripList = useSelector((state) => state.user.tripList);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/trips`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List Failed ", err.message);
    }
  };
  useEffect(() => {
    getTripList();
  }, []);
  console.log(tripList)
  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map(({ listingId,hostId, startDate, endDate, totalPrice,booking=true }) => (
          <ListingCard
            listingId={listingId._id}
            creator={hostId._id}
            listingPhotoPaths={listingId.listingPhotoPaths}
            city={listingId.city}
            startDate={startDate}
            category={listingId.category}
            province={listingId.province}
            country={listingId.country}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
          />
        ))}
      </div>
    </>
  );
};

export default Triplist;
