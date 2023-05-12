import React from "react";

const Loading = () => {
  return (
    <div className="Loading min-h-screen flex flex-col justify-center space-y-8 items-center">
      <h1 className="text-4xl font-bold">Loading...</h1>
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
    </div>
  );
};

export default Loading;
