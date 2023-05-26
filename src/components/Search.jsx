//imports
import React from "react";
import { useTweet } from "../contexts/TweetContext";

const Search = () => {
    const { allTweets, loading } = useTweet();
  return (
    <div>
      <form className="Search flex flex-row space-x-4 mb-4">
        <input type="text" className="border-2 p-2 w-full" placeholder="Search for user/tweet..." />
        <button className="bg-blue-400 text-white px-4">Search</button>
      </form>
    </div>
  );
};

export default Search;
