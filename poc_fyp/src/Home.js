/** @format */

import React from "react";
import "./Home.css";
import {useNavigate} from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const handleCheckoutPoc = () => {
    navigate("/predict");
  };

  return (
    <>
      <div className='home_main_container'>
        <div className='img_container'>
          <div className='img_container_text'>
            <h5>Household income sufficiency predictor</h5>
          </div>
          <div className='blank_div'></div>
          <div className='description_text'>
            <p>
              This is a<b> Final year 2024/25 project</b> focusing on predicting
              the <b>Household income sufficiency indicator</b> via deep
              learning technologies.
            </p>
            <p>
              Dear Users, please gain the below listed experience through this
              proof of concept.
            </p>
            <ul>
              Stay tuned to
              <li> Get your future household expenses predicted</li>
              <li>Get an idea on your household income sufficiency</li>
            </ul>
          </div>
        </div>

        <div className='home_sub_container'>
          <button id='home_btn' onClick={handleCheckoutPoc}>Check out the POC</button>
        </div>
      </div>
    </>
  );
}

export default Home;
