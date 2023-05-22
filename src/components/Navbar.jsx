//imports
// eslint-disable-next-line no-unused-vars
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
      <Link className="rounded-full" to="/settings">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={currentUser.photoURL}
        ></img>
      </Link>
    </div>
  );
};

export default Navbar;
