import React, { useEffect, useContext } from "react";
import "../src/App.css";
import { Context } from "./main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Navbar from "./Components/Layout/Navbar.jsx";
import Footer from "./Components/Layout/Footer.jsx";
import Home from "./Components/Home/Home";
import Jobs from "./Components/Job/Jobs";
import JobDetails from "./Components/Job/JobDetails";
import MyJobs from "./Components/Job/MyJobs";
import PostJob from "./Components/Job/PostJob";
import Application from "./Components/Applications/Application";
import MyApplication from "./Components/Applications/MyApplication";
import Notfound from "./Components/Notfound/Notfound";
import axios from "axios";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user/getuser", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplication />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <ToastContainer position="top-center"/>
        <Footer />
      </Router>
    </>
  );
};

export default App;
