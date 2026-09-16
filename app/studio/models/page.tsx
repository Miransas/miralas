import Footer from "../../../components/layout/Footer";
import { Header } from "../../../components/layout/Header";


import React from 'react'
import ModelsHero from "./hero-models";

const page = () => {
  return (
    <div>
      <Header/>
      <div className="pt-20">
        <ModelsHero/>
      </div>
      <Footer/>
    </div>
  )
}

export default page