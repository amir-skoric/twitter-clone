//imports
// eslint-disable-next-line no-unused-vars
import React from "react";

const Tweet = ({ docs }) => {

  function imgConditionalRender() {
    if (!docs.tweetImg) {
      return;
    } else {
      return <img src={docs.tweetImg} className="object-cover h-80 w-80"></img>;
    }
  }

  function commentsConditionalRender() {
    if (!docs.comments[0]) {
      return (
        <div className="bg-inherit">
          <p className="bg-inherit">No comments</p>
        </div>
      );
    } else {
      return (
        <div className="bg-inherit">
          <p className="bg-inherit">{docs.comments}</p>
        </div>
      );
    }
  }

  return (
    <div className="Tweet flex flex-col p-4 border-2 border-slate-800 my-8 bg-gray-950">
      <div className="flex flex-row items-center space-x-4 border-slate-600 border-b-2 border-spacing-y-2 pb-4 bg-inherit">
        <img
          src={docs.createdByPhotoURL}
          className="h-12 w-12 rounded-full object-cover"
        ></img>
        <p className="bg-inherit">{docs.createdByEmail}</p>
      </div>
      <div className="flex flex-col mt-4 justify-center bg-inherit">
        <p className="mb-8 bg-inherit font-thin">{docs.tweetTxt}</p>
        {imgConditionalRender()}
      </div>
      <div className="flex flex-row justify-between bg-inherit my-4">
        <button className="mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bg-inherit"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />{" "}
          </svg>
        </button>
        <button className="p-2 bg-blue-400 text-white mt-4">Comment</button>
      </div>
      <div className="bg-inherit mt-16">
          <p className="bg-inherit font-bold">Date</p>
          <p className="bg-inherit italic">{docs.date}</p>
        </div>
      <div className="bg-gray-950 space-y-4 mt-4">
        <h1 className="text-lg font-bold bg-inherit underline underline-offset-4">
          Comments
        </h1>
        {commentsConditionalRender()}
      </div>
    </div>
  );
};

export default Tweet;
