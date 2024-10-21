import React from 'react'
import Header from '../components/header'
import Categories from '../components/categories'
import FeaturedProducts from '../components/featuredProducts'
import LatestProducts from '../components/latestedProduct'
import Offer from '../components/offer'
import Brands from '../components/brands'

const Home = () => {
  return (
    <>
      <Header/>
      <Categories/>
      <FeaturedProducts/>
      <LatestProducts/>
      {/* <Offer/> */}
      <Brands/>
    </>
  )
}

export default Home
