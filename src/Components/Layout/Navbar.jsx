import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import whitelogo from "../../assets/JobZee-logos__white.png";

const Navbar = () => {
  const [show, setShow] = useState(false);
  
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  console.log(isAuthorized)
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      setIsAuthorized(false)
      console.log("setting isAuthorized value false from logout",isAuthorized)
      navigateTo("/login");
    } catch (error) {
      // toast.error(response.data.error)
      console.error(error.message)
    }
    console.log(isAuthorized)
  };

  return (
    <nav className={ "navbarShow" }>
      <div className="container">
        <div className="logo">
        <img src={whitelogo} alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} >
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

        <Link to={"/login"}>
          <button>LOGIN</button>
        </Link>
          {/* <button onClick={handleLogout}>{isAuthorized?"LOGOUT":"LOGIN"}</button> */}
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
