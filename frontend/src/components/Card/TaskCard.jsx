import React from "react";
import { useNavigate } from "react-router-dom";
import "./TaskCard.css";

export default function TaskCard({ value }) {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="box">
        {value ? (
          value?.map((data, index) => {
            return (
              <div key={index} className="task-list">
                <div className="list-top">
                  <p className="head-p">{`No: ${data.task_no}`}</p>
                  <p className="head-p">{`Estimate Time: ${data.time_hour}.${data.time_minutes}`}</p>
                  {data.actual_time ? (
                    <p className="head-p">{`Actual time: ${data.actual_time}`}</p>
                  ) : null}
                  <button
                    onClick={() =>
                      navigate("/view-task", { state: { data: data } })
                    }
                    className="view-button"
                  >
                    View
                  </button>
                </div>
                <div className="notes">
                  <p>{data.notes}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-list">
            <h1>ADD A NEW TASK</h1>
          </div>
        )}
      </div>
    </div>
  );
}
