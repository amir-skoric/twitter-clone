//imports
import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import Tweet from "../components/Tweet";
import LoadingTweets from "../components/loading/LoadingTweets";

const AllTweets = () => {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTweets = () => {
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
          setDocs(res);
          setLoading(false);
        });
        return () => unsub();
      } catch (err) {
        setError(err);
      }
    };
    getTweets();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-xl mt-16">Public Feed</h1>
      <div className="text-red-400 text-center mt-8">
        {JSON.stringify(error && error.code)}
      </div>
      {loading && <LoadingTweets />}
      {docs.length === 0 && (
        <>
          <div>
            <p className="my-4">Nothing to see here...</p>
          </div>
        </>
      )}
      {!loading && docs.map((docs) => <Tweet key={docs.id} docs={docs} />)}
    </div>
  );
};

export default AllTweets;
