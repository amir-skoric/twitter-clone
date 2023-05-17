import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center p-20 space-y-10 text-center">
      <h2 className="text-xl">
        Sorry, but the page you have reached does not exist
      </h2>
      <h1 className="text-8xl text-blue-400">404</h1>
    </div>
  );
};

export default NotFound;