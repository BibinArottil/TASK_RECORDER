import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../instance/axios";
import "./Window.css";

export default function Window({ visible, data, subData }) {
  const navigate = useNavigate();
  const [inputValue, setinputValue] = useState("");

  const handleInputChange = (e) => {
    setinputValue(e.target.value);
  };

  const handleSubmit = async () => {
    let hours = inputValue;
    const numeric = /^[0-9]+$/;
    if (inputValue.length === 0) {
      alert("You should be enter Hours");
    } else if (!numeric.test(hours)) {
      alert("You should enter hours in numbers");
    }
    hours = parseInt(inputValue);
    if (inputValue.length !== 0 && numeric.test(hours)) {
      try {
        axios.post("/submit/" + data._id, { hours }).then((res) => {
          if (res.data.state) {
            navigate("/");
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  if (!visible) return null;

  return (
    <div className="container">
      <div className="window">
        <div className="win-head">
          <input
            className="input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Total hours"
            maxLength={2}
          />
          <button onClick={() => navigate("/")} className="close-button">
            Close
          </button>
          <button onClick={handleSubmit} className="sub-button">
            Submit
          </button>
        </div>
        <div className="win-content">
          <div className="notes">
            <p className="head-p">{`Estimate time: ${data.time_hour}.${data.time_minutes}`}</p>
            <p>{data.notes}</p>
          </div>
          {subData
            ? subData?.map((data, index) => {
                return (
                  <div key={index} className="notes">
                    <p className="head-p">{`Estimate time: ${data.time_hour}.${data.time_minutes}`}</p>
                    <p>{data.notes}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
