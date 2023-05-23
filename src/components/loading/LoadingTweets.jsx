//imports
// eslint-disable-next-line no-unused-vars
import React from "react";

const LoadingTweets = () => {
  return (
    <div className="Loading flex flex-col justify-center items-center mt-20 mb-64">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
    </div>
  );
};

export default LoadingTweets;
