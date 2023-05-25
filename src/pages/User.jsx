import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useLocation } from "react-router-dom";
import Tweet from "../components/Tweet";
import LoadingTweets from "../components/loading/LoadingTweets";

const User = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [tweetsByUser, setTweetsByUser] = useState([]);

  const { state } = useLocation();

  useEffect(() => {
    const getTweetsByUser = () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "tweets"),
          where("createdById", "==", state.allTweets.createdById)
        );

        const unsub = onSnapshot(q, (snapshot) => {
          const res = [];
          snapshot.forEach((tweet) => {
            res.push({
              id: tweet.id,
              ...tweet.data(),
            });
          });
          setTweetsByUser(res);
          console.log(res);
          setLoading(false);
        });
        return () => unsub();
      } catch (err) {
        setError(err);
      }
    };
    getTweetsByUser();
  }, []);

  return (
    <div className="User flex flex-col px-8 space-y-4 my-8">
      <div className="flex flex-col justify-center items-center space-y-4 mb-8">
        <img src={state.allTweets.createdByPhotoURL} className="rounded-full h-32 w-32 object-cover"></img>
        <h2 className="text-xl">{state.allTweets.createdByEmail} </h2>
        <p>Tweets: {tweetsByUser.length}</p>
      </div>
      <h1 className="font-bold text-xl mt-16">Tweets</h1>
      {loading && <LoadingTweets />}
      {tweetsByUser && tweetsByUser.length === 0 && (
        <>
          <div>
            <p className="my-4">Nothing to see here...</p>
          </div>
        </>
      )}
      {!loading &&
        tweetsByUser.map((tweetsByUser) => (
          <Tweet key={tweetsByUser.id} allTweets={tweetsByUser} />
        ))}
    </div>
  );
};

export default User;
