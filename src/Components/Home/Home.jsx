import React, { useContext } from "react";
// import { Context } from '../../main'
import HeroSection from "../Home/HeroSection";
import HowItWorks from "../Home/HowItWorks";
import PopularCategories from "../Home/PopularCategories";
import PopularCompanies from "../Home/PopularCompanies";
// import { Navigate } from 'react-router-dom';
const Home = () => {
  // if(!isAuthorized){
  //   return <Navigate to={'/login'}/>
  // }

  return (
    <section className="homePage page">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
};

export default Home;
