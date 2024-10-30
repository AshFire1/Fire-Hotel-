import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import Triplist from "./pages/Triplist";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationsList";
function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login"  element={<LoginPage/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/properties/:listingId" element={<ListingDetails/>}/>
        <Route path="/:userId/trips" element={<Triplist/>}/>
        <Route path="/:userId/wishList" element={<WishList/>}/>
        <Route path="/:userId/properties" element={<PropertyList/>}/>
        <Route path="/:userId/reservations" element={<ReservationList/>}/>
      </Routes>
      </BrowserRouter>
     
    </Provider>
  );
}

export default App;
