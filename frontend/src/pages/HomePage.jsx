import React from 'react'
import Header from '../components/Layout/Header'
import Hero from '../components/Route/Hero'
import Categories from '../components/Route/Categories'
import BestDeals from '../components/Route/BestDeals'
import FeaturedProduct from '../components/Route/FeaturedProduct'
import Sponsored from '../components/Route/Sponsored'
import Events from '../components/Events/Events'
import Footer from '../components/Layout/Footer'

const HomePage = ()=>{
    return(
        <div>
            <Header activeHeading={1}/>
            <Hero/>
            <Categories/>
            <BestDeals/>
            <Events/>
            <FeaturedProduct/>
            <Sponsored/>
            <Footer/>
        </div>
    )
}

export default HomePage