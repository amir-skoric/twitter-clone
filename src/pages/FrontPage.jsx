import React from "react";
import { useAuth } from "../contexts/AuthContext";
import CRUDTweet from '../components/CRUDTweet'

const Frontpage = () => {
  const { currentUser } = useAuth();
  return (
    <div className="Frontpage flex flex-col px-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">
        Hello, {currentUser.displayName || currentUser.email}!
      </h1>
      <CRUDTweet />
    </div>
  );
};

export default Frontpage;
