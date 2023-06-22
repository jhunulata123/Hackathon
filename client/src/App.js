import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Projects from "./Pages/Projects";

function App() {
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  });

  // const navigate = useNavigate()

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={isLoggedIn && <Home />} />
            <Route path="/Projects" element={isLoggedIn && <Projects />} />
            {/* <Route path="/updateproject/:id" element={isLoggedIn && <UpdateProject />} /> */}
            <Route
              exact
              path="/login"
              element={ <Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={ <Signup showAlert={showAlert} />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;