import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Frontpage = () => {
  const { currentUser } = useAuth();
  return (
    <div className="Frontpage flex flex-col justify-center px-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">
        Hello, {currentUser.displayName || currentUser.email}!
      </h1>
    </div>
  );
};

export default Frontpage;
