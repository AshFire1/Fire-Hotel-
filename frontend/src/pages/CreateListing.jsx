import React, { useState } from "react";
import "../styles/CreateListing.scss";
import NavBar from "../components/NavBar";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot";
import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateListing = () => {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [ameneties, setAmenities] = useState([]);
  const navigate=useNavigate()

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });
  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };
  const handleSelectAmenities = (facility) => {
    if (ameneties.includes(facility)) {
      setAmenities((prevAmeminties) =>
        prevAmeminties.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };
  console.log(ameneties)
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };
  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };
  console.log(type)
  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };
  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((photo, index) => index !== indexToRemove)
    );
  };
  const creatorId = useSelector((state) => state.user._id);
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      // a new form data object to handle file upload
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      console.log(ameneties)
      listingForm.append("ameneties", ameneties);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);
      photos.forEach((photo)=>{
        listingForm.append("listingPhotos",photo)
      })
      // amenities.forEach((fac)=>{
      //   listingForm.append("amenitie")
      // })
       const response =await fetch("http://localhost:3001/properties/create",{
        method:"POST",
        body:listingForm 
    })
    if(response.ok){
      navigate("/")
    }
    } catch (err) {
      console.log("Publish Listing Failed" ,err.message)
    }

  };
  return (
    <>
      <NavBar />
      <div className="create-listing">
        <h1>Publish Your Page.</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell Us About Your Place</h2>
            <hr />
            <h3>Which of these Categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon"> {item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <h3>What type of Place will guests have?</h3>
            <div className="type-list">
              {types.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>
            <h3>Where is your Place Located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Adress</p>
                <input
                  type="text"
                  placeholder="Street Adress"
                  name="streetAddress"
                  onChange={handleChangeLocation}
                  value={formLocation.streetAddress}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Apartment,Suite,etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt,Suite,etc"
                  name="aptSuite"
                  onChange={handleChangeLocation}
                  value={formLocation.aptSuite}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input type="text" onChange={handleChangeLocation} value={formLocation.city}placeholder="City" name="city" required />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  onChange={handleChangeLocation}
                  value={formLocation.province}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  onChange={handleChangeLocation}
                  value={formLocation.country}
                  required
                />
              </div>
            </div>
            <h3>Share Some Basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover:": { color: variables.pinkred },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover:": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover:": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover:": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover:": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover:": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover:": { color: variables.pinkred },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover:": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create-listing_step2">
            <h2>Step 2: Make your Place Stand Out</h2>
            <hr />
            <h3>Tell Guests What Your Place Has to Offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    ameneties.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>   
              ))}
            </div>
            <h3>Add Some photos </h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <h3>What Makes your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                value={formDescription.description}
                onChange={handleChangeDescription}
                placeholder="Description"
                name="description"
                required
              />
              <p>Highlight</p>
              <input
                type="text"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                placeholder="Highlight"
                name="highlight"
                required
              />
              <p>Highlight Details</p>
              <textarea
                type="text"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                placeholder="Highlight Details"
                name="highlightDesc"
                required
              />
              <p>Now,Set Your Price</p>
              <span>$</span>
              <input
                type="number"
                placeholder="100"
                value={formDescription.price}
                onChange={handleChangeDescription}
                name="price"
                className="price"
                required
              />
            </div>
          </div>
          <button className="submit_btn" type="submit">
            {" "}
            Create Your Listing
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
