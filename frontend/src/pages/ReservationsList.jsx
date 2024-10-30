import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const reservationList=useSelector((state)=> state.user.reservationList)
  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List Failed ", err.message);
    }
  };
  useEffect(() => {
    getReservationList();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList?.map(({ listingId,hostId, startDate, endDate, totalPrice,booking=true }) => (
          <ListingCard
            listingId={listingId._id}
            listingPhotoPaths={listingId.listingPhotoPaths}
            creator={hostId._id}
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

export default ReservationList;
 