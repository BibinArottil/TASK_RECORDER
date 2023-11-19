import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h1 className="header-h1">Task Recorder</h1>
      <button className="add-button" onClick={() => navigate("/add-task")}>
        Add Task
      </button>
    </div>
  );
}
