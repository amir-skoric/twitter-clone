//imports
import React from "react";

import Tweet from "../components/Tweet";
import LoadingTweets from "../components/loading/LoadingTweets";
import { useTweet } from "../contexts/TweetContext";

const AllTweets = () => {
  const { allTweets, loading } = useTweet();

  return (
    <div>
      <h1 className="font-bold text-xl mt-16">Public Feed</h1>
      {loading && <LoadingTweets />}
      {allTweets.length === 0 && (
        <>
          <div>
            <p className="my-4">Nothing to see here...</p>
          </div>
        </>
      )}
      {!loading && allTweets.map((allTweets) => <Tweet key={allTweets.id} allTweets={allTweets} />)}
    </div>
  );
};

export default AllTweets;
