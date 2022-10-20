import Announcements from './announcement'
import React from 'react'
import Navbar from './navbar'
import Slider from './slider'
import Categories from './categories'
import Newsletter from './newsletter'
import Footer from './footer'
import PopularProduct from "./popularProduct";
import styled from "styled-components";



export const Home = () => {
    return (
        <div>
            <Announcements/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <PopularProduct/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}




