//imports
import React, { useContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const TweetContext = React.createContext();

export function useTweet() {
  return useContext(TweetContext);
}

export function TweetProvider({ children }) {
  const [allTweets, setAllTweets] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllTweets = () => {
      try {
        setLoading(true);
        const querySnapshot = collection(db, "tweets");
        const unsub = onSnapshot(querySnapshot, (snapshot) => {
          const res = [];
          snapshot.forEach((tweet) => {
            res.push({
              id: tweet.id,
              ...tweet.data(),
            });
          });
          setAllTweets(res);
          setLoading(false);
        });
        return () => unsub();
      } catch (err) {
        setError(err);
      }
    };
    getAllTweets();
  }, []);

  const value = {
    allTweets,
    loading,
  };

  return (
    <TweetContext.Provider value={value}>{children}</TweetContext.Provider>
  );
}
