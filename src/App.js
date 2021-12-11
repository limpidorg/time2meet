import React from "react";
import { Home } from "./views/Home.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

class Base extends React.Component {
  render() {
    return (
      <div>
        <Outlet />
      </div>
    )
  }
}

function App() {
  return (
    <div className="application">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route index element={<Home />}>
            </Route>
            <Route path="*" element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
