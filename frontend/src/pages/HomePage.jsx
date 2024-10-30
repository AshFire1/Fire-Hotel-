import React from 'react'
import NavBar from '../components/NavBar'
import Slide from '../components/Slide'
import Categories from '../components/Categories' 
import Listings from '../components/Listings'
const HomePage = () => {
  return (
    <div>
      <NavBar/>
      <Slide/>
      <Categories/>
      <Listings/>
    </div>
  )
}

export default HomePage