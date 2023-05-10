//imports
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase/config";
import { Link } from "react-router-dom";

//main function
const SignUp = () => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return alert("Passwords do not match!");
    }
    //firebase create user method
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //update profile to add displayname after account generation
        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
          .then(() => {
            console.log("Profile created");
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className="flex flex-col space-y-4 p-8" onSubmit={signUp}>
        <h1 className="text-xl">Create an account</h1>
        <input
          className="border border-2 p-2"
          type="email"
          placeholder="Enter your e-mail..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="border border-2 p-2"
          type="text"
          placeholder="Enter your display name..."
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        ></input>
        <input
          className="border border-2 p-2"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          className="border border-2 p-2"
          type="password"
          placeholder="Confirm password..."
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        ></input>
        <button className="p-2 mx-auto border border-2 bg-white text-black" type="submit">
          Sign Up
        </button>
      </form>
      <div className="w-100 text-center mt-4">
      Already have an account? <Link className="text-blue-400" to="/signin">Log in here!</Link>
    </div>
    </div>
  );
};

export default SignUp;
