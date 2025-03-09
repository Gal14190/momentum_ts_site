import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import MainLayOut from "./layouts/mainLayOut/MainLayOut";

function App() {
  return (
    <div className="app">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="routes">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<div>404 not found</div>} />
          {/* <Route path="/" element={<MainLayOut children={<Outlet />} />} >
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<div>404 not found</div>} />
          </Route> */}
          {/* <Route path="/" /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
