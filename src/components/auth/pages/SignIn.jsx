//imports
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase/config";
import { Link } from "react-router-dom";

//main function
const SignIn = () => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    //firebases own signin method
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className="flex flex-col space-y-4 p-8"  onSubmit={signIn}>
        <h1 className="text-xl">Log in to your account</h1>
        <input
          className="border border-2 p-2"
          type="email"
          placeholder="Enter your e-mail..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="border border-2 p-2"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className="p-2 mx-auto border border-2 bg-white text-black"
          type="submit"
        >
          Log In
        </button>
      </form>
      <div className="w-100 text-center mt-4">
        Need an account? <Link className="text-blue-400" to="/signup">Sign up here!</Link>
      </div>
    </div>
  );
};

export default SignIn;
