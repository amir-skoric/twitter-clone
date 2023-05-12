//imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

//main function
const SignIn = () => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const { signin } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signin(email, password);
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className="SignIn flex flex-col justify-center min-h-screen">
      <h1 className="text-xl p-8 pb-0">Log in to your account</h1>
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
        <button
          className="p-2 mx-auto bg-blue-400 text-white w-full"
          type="submit"
        >
          Log In
        </button>
        <div className="text-red-400 text-center">
          {JSON.stringify(error && error.code)}
        </div>
      </form>
      <div className="w-100 text-center mt-4">
        Need an account?{" "}
        <Link className="text-blue-400" to="/signup">
          Sign up here!
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
