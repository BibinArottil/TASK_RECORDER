import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../instance/axios";
import Window from "../PopUp/Window";
import "./ViewTask.css";

export default function ViewTask() {
  const location = useLocation();
  const navigate = useNavigate();
  const taskData = location.state?.data;
  const [subTask, setSubTask] = useState([]);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    axios
      .get("/sub-task/" + taskData._id)
      .then((res) => {
        setSubTask(res.data.taskData.sub_task);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="view-container">
      <div className="view-task">
        <div className="main-task">
          <div className="head">
            <p className="head-p">{`No: ${taskData.task_no}`}</p>
            <p className="head-p">{`Esimate time: ${taskData.time_hour}.${taskData.time_minutes}`}</p>
            {taskData.total_hours ? (
              <p className="head-p">{`Total hours: ${taskData?.total_hours}`}</p>
            ) : null}
            {!taskData.total_hours ? (
              <button
                className="edit-button"
                onClick={() =>
                  navigate("/edit-task", { state: { data: taskData._id } })
                }
              >
                Edit
              </button>
            ) : null}
            {!taskData.completed ? (
              <button
                className="complete-button"
                onClick={() => setPopUp(true)}
              >
                Complete Task
              </button>
            ) : null}
          </div>
          <div className="note">
            <p>{taskData.notes}</p>
          </div>
        </div>
        <div className="view-sub">
          {subTask
            ? subTask?.map((data, index) => {
                return (
                  <div key={index} className="sub-task">
                    <div className="sub-head">
                      <p className="head-p">{`Estimate time: ${data.time_hour}.${data.time_minutes}`}</p>
                    </div>
                    <p>{data.notes}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <Window visible={popUp} data={taskData} subData={subTask} />
    </div>
  );
}
