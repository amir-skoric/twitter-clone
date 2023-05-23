//imports
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Tweet from "../components/Tweet";
import LoadingTweets from "../components/loading/LoadingTweets";

const AllTweets = () => {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  
  const loadingSpinner = () => {
    if (loading) return <LoadingTweets />;
  };

  const noTweets = () => {
    if (!docs[0]) {
      return (
        <div>
          <p className="my-4">Nothing to see here...</p>
        </div>
      );
    }
  };

  const res = [];

  useEffect(() => {
      const getTweets = async () => {
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(db, "tweets"));
          querySnapshot.forEach((tweet) => {
            res.push({
              id: tweet.id,
              ...tweet.data(),
            });
          });
          setDocs([...res]);
          console.log(...res)
          setLoading(false);
        } catch (err) {
          setError(err);
        }
      };
      getTweets();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-xl mt-16">Public feed</h1>
      {loadingSpinner()}
      {noTweets()}
      {!loading && docs.map((docs) => <Tweet key={docs.id} docs={docs} />)}
      <div className="text-red-400 text-center">
        {JSON.stringify(error && error.code)}
      </div>
    </div>
  );
};

export default AllTweets;
