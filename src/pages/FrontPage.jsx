import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const FrontPage = () => {
  const [error, setError] = useState();
  const { currentUser, signout } = useAuth();

  async function handleSignOut() {
    try {
      await signout();
    } catch (err) {
      setError(err);
    }
  }
  return (
    <div className="FrontPage flex flex-col justify-center items-center p-8 min-h-screen">
      <h1 className="text-2xl font-bold">Welcome to Twitter 🤫</h1>
      <p>{currentUser.displayName || currentUser.email} </p>
      <div className="text-red-400 text-center">
        {JSON.stringify(error && error.code)}
      </div>
      <img className="rounded-full h-32 w-32" src={currentUser.photoURL}></img>
      <div>
        <button
          className="p-2 bg-blue-400 text-white w-full mt-4"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default FrontPage;
