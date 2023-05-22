//imports
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

//main function
const SignUp = () => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [photoURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/twitter-clone-8a93e.appspot.com/o/defaultProfilePic.png?alt=media&token=598addef-c6e4-4483-92e4-3e7062de7c5d"
  );
  const [error, setError] = useState();
  const { signup } = useAuth();

  //function that handles submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return alert("Passwords do not match!");
    }
    try {
      await signup(email, password, photoURL);
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className="SignUp flex flex-col justify-center min-h-screen">
      <h1 className="text-xl p-8 pb-0">Create an account</h1>
      <form
        className="flex flex-col space-y-4 p-8 text-black"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 p-2"
          type="email"
          placeholder="Enter your e-mail..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="border-2 p-2"
          type="password"
          placeholder="Enter your password..."
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          className="border-2 p-2"
          type="password"
          placeholder="Confirm password..."
          required
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        ></input>
        <button
          className="p-2 mx-auto bg-blue-400 text-white w-full"
          type="submit"
        >
          Sign Up
        </button>
        <div className="text-red-400 text-center">
          {JSON.stringify(error && error.code)}
        </div>
      </form>
      <div className="w-100 text-center mt-4">
        Already have an account?{" "}
        <Link className="text-blue-400" to="/signin">
          Log in here!
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
