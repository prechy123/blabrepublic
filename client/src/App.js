import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import './App.css';
import { NavBar } from "./components/navBar";
import { ScrollToTop } from "./components/scrollTop";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="min-h-screen w-full">
      <Router>
        <ScrollToTop />
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route
              path="/"
              element={<Home />}
          ></Route>
          <Route
              path="/login"
              element={<Login />}
          ></Route>
          <Route
              path="/register"
              element={<Register />}
          ></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
