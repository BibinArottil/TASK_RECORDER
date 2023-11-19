import React, { useEffect, useState } from "react";
import axios from "../instance/axios";
import Header from "../components/Header/Header";
import TaskCard from "../components/Card/TaskCard";

export default function Home() {
  const [list, setList] = useState();

  useEffect(() => {
    axios.get("/home").then((res) => {
      setList(res.data.list);
    });
  }, []);

  return (
    <>
      <Header />
      <TaskCard value={list} />
    </>
  );
}
