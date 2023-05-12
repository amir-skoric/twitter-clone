import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { currentUser, signout } = useAuth();

  async function handleSignOut() {
    try {
      await signout();
      navigate("/signin");
    } catch (err) {
      setError(err);
    }
  }
  return (
    <div className="FrontPage flex flex-col justify-center p-8 min-h-screen">
      <h1 className="font-bold text-2xl">Welcome to Twitter 🤥</h1>
      <div className="text-red-400 text-center">
        {JSON.stringify(error && error.code)}
      </div>
      <p>Display name: {currentUser.displayName}</p>
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
