//imports
import React, { useEffect, useState } from "react";

import Tweet from "../components/Tweet";
import LoadingTweets from "../components/loading/LoadingTweets";
import {
  collection,
  getDocs,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { useTweet } from "../contexts/TweetContext";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";

const FollowingTweets = () => {
  const { allTweets } = useTweet();
  const { currentUser } = useAuth();
  const [userTweets, setUserTweets] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getTweetsUser = async () => {
      const querySnapshot = query(
        collection(db, "tweets"),
        where("createdById", "==", "XjAtn72y25YOF26YCI5R5OcwBZu2")
      );
      const unsub = onSnapshot(querySnapshot, (snapshot) => {
        const res = [];
        snapshot.forEach((tweet) => {
          res.push({
            id: tweet.id,
            ...tweet.data(),
          });
        });
        setUserTweets(res);
        setLoading(false);
      });
      return () => unsub();
    };
    getTweetsUser();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-xl mt-16">Your feed</h1>
      {loading && <LoadingTweets />}
      {userTweets.length === 0 && (
        <>
          <div>
            <p className="my-4">Nothing to see here...</p>
          </div>
        </>
      )}
      {}
      {!loading &&
        userTweets.map((userTweets) => (
          <Tweet key={userTweets.id} allTweets={userTweets} />
        ))}
    </div>
  );
};

export default FollowingTweets;
