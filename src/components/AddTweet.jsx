//imports
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  updateDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";

import { v4 as uuidv4 } from "uuid";

const AddTweet = () => {
  //states
  const [tweet, setTweet] = useState("");
  const [tweetImg, setTweetImg] = useState("");
  const [error, setError] = useState();
  const { currentUser } = useAuth();

  //submit a new tweet
  async function handleSubmit(e) {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const random = uuidv4();
    const storageRef = ref(storage, `tweets/${currentUser.uid}/${random}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        setTweetImg(downloadURL);
        setError(undefined);
      });
    });
    await addDoc(
      collection(db, "tweets"),
      {
        createdBy: currentUser.uid,
        date: new Date(),
        tweet: { tweet, tweetImg },
        comments: [],
        likes: [],
      },
      setTweet(""),
      setTweetImg("")
    );
    (err) => {
      setError(err);
    };
  }

  return (
    <div className="SignUp flex flex-col justify-center ">
      <h2 className="text-xl bg-inherit mb-4">What&apos;s on your mind?</h2>
      <div className="text-red-400 text-center">
        {JSON.stringify(error && error.code)}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 text-white bg-inherit"
      >
        <textarea
          className="border-2 p-2 resize-none"
          rows="6"
          type="text"
          placeholder="Tell the world what you're thinking about!"
          required
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        ></textarea>
        <input
          className="border-2 p-2"
          type="file"
          accept="image/png, image/jpeg"
        ></input>
        <button
          type="submit"
          className="p-2 bg-blue-400 text-white w-full mt-4"
        >
          Send Tweet
        </button>
      </form>
      <div className="w-100 text-center mt-4"></div>
    </div>
  );
};

export default AddTweet;
