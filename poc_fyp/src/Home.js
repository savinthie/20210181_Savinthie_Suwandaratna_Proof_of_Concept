/** @format */

import React from "react";
import "./Home.css";
import poclogo from "./poc.jpg";
function Home() {
  return (
    <>
      <div className='home_main_container'>
        <div className='img_container'>
         <div className = 'img_container_text'>   
        <h4>Household income sufficiency prediction</h4>
        </div>
          <img src={poclogo} alt='poc_logo_image' />
        </div>

        <div className='home_sub_container'>
         
          <button>Check out the POC</button>
        </div>
      </div>
    </>
  );
}

export default Home;
