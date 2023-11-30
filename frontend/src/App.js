import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import ViewTask from "./pages/ViewTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add-task" element={<AddTask />} />
          <Route exact path="/view-task" element={<ViewTask />} />
          <Route exact path="/edit-task" element={<EditTask />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
