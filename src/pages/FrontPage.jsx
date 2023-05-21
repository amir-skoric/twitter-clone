//imports
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import AddTweet from '../components/AddTweet'

const Frontpage = () => {
  const { currentUser } = useAuth();
  return (
    <div className="Frontpage flex flex-col px-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">
        Hello, {currentUser.displayName || currentUser.email}!
      </h1>
      <AddTweet />
    </div>
  );
};

export default Frontpage;
