import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RichTextEditor from "../TextEditor/RichTextEditor";
import "../AddForm/AddTaskForm";
import axios from "../../instance/axios";

export default function EditTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const taskId = location.state?.data;

  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [values, setValues] = useState({
    time_hour: "",
    time_minutes: "",
  });

  const handleEditorChange = (value) => {
    setNote(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let timeHour = values.time_hour;
    let timeMinutes = values.time_minutes;
    const numeric = /^[0-9]+$/;
    if (values.time_hour.length === 0 || values.time_minutes.length > 2) {
      setError("You should enter hour");
    } else if (!numeric.test(timeHour)) {
      setError("You should enter hours in numbers");
    } else if (!numeric.test(timeMinutes)) {
      setError("You should enter minutes in numbers");
    } else if (note.length === 0) {
      setError("You should enter notes");
    } else {
      setError("");
    }

    let hour = parseInt(values.time_hour);
    let minute = parseInt(values.time_minutes);
    if (minute > 60) {
      minute = minute - 60;
      hour++;
    } else if (minute === 60) {
      hour++;
      minute = 0;
    }
    values.time_hour = hour;
    values.time_minutes = minute;

    if (
      values.time_hour.length !== 0 &&
      numeric.test(timeHour) &&
      numeric.test(timeMinutes) &&
      note.length > 7
    ) {
      try {
        axios
          .post("/edit-task", { values, note, taskId })
          .then((res) => {
            console.log(res.data.message);
            if (res.data.state) {
              navigate("/");
            } else {
              alert(res.data.message);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="main-div">
      <div className="task-box">
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              className="input"
              type="text"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              placeholder="Enter hours"
              name="time_hour"
              maxLength={2}
            />
            <input
              className="input"
              type="text"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              placeholder="Enter minutes"
              name="time_minutes"
              maxLength={2}
            />
          </div>
          <div className="text-box">
            <RichTextEditor onEditorChange={handleEditorChange} />
          </div>
          <div className="show-error">
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div>
            <button className="submit-button">Submit edit task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
