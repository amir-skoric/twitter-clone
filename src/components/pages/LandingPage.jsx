import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
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
    <div className="LandingPage text-center">
      <h1>Welcome to Twitter, I think...</h1>
      <div className="text-red-400 text-center">
        {JSON.stringify(error && error.code)}
      </div>
      <p>Display name: {currentUser.displayName}</p>
      <div>
        <button
          className="p-2 mx-auto border-2 bg-white text-black"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
