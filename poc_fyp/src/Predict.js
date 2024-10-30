import React, { useState, useEffect } from "react";
import './Predict.css'
import {useNavigate} from "react-router-dom";

 

function Predict() {
  // created the state variables
  const [total, set_total_expenses] = useState(0);
  const [median_family_income, set_median_family_income] = useState(0);
  const [num_counties_in_st, setnum_counties_in_st] = useState(0);
  const [number_of_children, set_number_of_children] = useState(0);
  const [number_of_parents, set_number_of_parents] = useState(0);
  const [number_of_family_members, set_number_of_family_members] = useState(0);

  // created the state variable for the predictions
  const [predictions, setPredictions] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug log to check form data before sending
    console.log({
      total,
      median_family_income,
      num_counties_in_st,
      number_of_parents,
      number_of_children,
      number_of_family_members
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total,
          median_family_income,
          num_counties_in_st,
          number_of_parents,
          number_of_children,
          number_of_family_members
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Capture more detailed error message
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }

      const data = await response.json();
      console.log("Backend response:", data); // Log backend response for debugging
      setPredictions(data);

    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/");
  };

  //create the form to retrieve the household data
  return (
    <>
      <div className='img_container_text'>
        <h5>Household income sufficiency predictor</h5>
        <div className='blank_div'></div>
      </div>
      <div className='form_container'>
        <div className='form_subcontainer'>
          <form onSubmit={handleSubmit}>
            <label>
              Previous Months' Total Expenses:<br />
              <input type="number" value={total} onChange={(e) => set_total_expenses(e.target.value)} />
            </label>
            <br />
            <label>
              Median Family Income:<br />
              <input type="number" value={median_family_income} onChange={(e) => set_median_family_income(e.target.value)} />
            </label>
            <br />
            <label>
              Number of Counties in State:<br />
              <input type="number" value={num_counties_in_st} onChange={(e) => setnum_counties_in_st(e.target.value)} />
            </label>
            <br />
            <label>
              Number of Children:<br />
              <input type="number" value={number_of_children} onChange={(e) => set_number_of_children(e.target.value)} />
            </label>
            <br />
            <label>
              Number of  Parent:<br />
              <input type="number" value={number_of_parents} onChange={(e) => set_number_of_parents(e.target.value)} />
            </label>
            <br />
            <label>
              Number of Members:<br />
              <input type="number" value={number_of_family_members} onChange={(e) => set_number_of_family_members(e.target.value)} />
            </label>
            <br />
            <button type="submit">Predict</button>
          </form>
        </div>
        <div className='result_container'>
          <h2>Prediction Results</h2>
          {predictions ? (
            <table>
              <thread>
                <tr>
                  <th>Category</th>
                  <th>Predicted living minimum</th>
                </tr>
              </thread>
              <tbody>
                <tr>
                  <td>Housing</td>
                  <td>${predictions?.Housing?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Food</td>
                  <td>${predictions?.Food?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Transportation</td>
                  <td>${predictions?.Transportation?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Healthcare</td>
                  <td>${predictions?.Healthcare?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Other Necessities</td>
                  <td>${predictions?.Other_Necessities?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Childcare</td>
                  <td>${predictions?.Childcare?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Taxes</td>
                  <td>${predictions?.Taxes?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Total predicted living minimum</td>
                  <td>${predictions?.Total_Predicted_Expenses?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Micro econmomic level household income sufficiency indicator</td>
                  <td className={predictions?.Predicted_Financial_Stability > 1 ? 'sufficient' : 'insufficient'}>{predictions?.Predicted_Financial_Stability?.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No prediction</p>
          )

          }
        </div>
        <button onClick={handleReturnHome}>Back</button>
      </div>
    </>
  );
}
export default Predict;