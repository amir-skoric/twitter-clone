import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <div className="Navbar flex flex-row justify-between items-center p-8 mb-8">
      <Link className="rounded-full" to="/">
        <img className="h-12 w-12" src={Logo}></img>
      </Link>
      <Link className="rounded-full" to="/profile">
        <img
          className="h-12 w-12 rounded-full"
          src={currentUser.photoURL}
        ></img>
      </Link>
    </div>
  );
};

export default Navbar;
