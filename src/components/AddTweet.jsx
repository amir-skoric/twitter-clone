//imports
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

import { v4 as uuid } from "uuid";

const AddTweet = () => {
  //states
  const [tweetTxt, setTweetTxt] = useState("");
  const [error, setError] = useState();
  const { currentUser } = useAuth();

  //submit a new tweet
  async function handleSubmit(e) {
    e.preventDefault();
    let inputFile = document.getElementById("file");
    const file = inputFile.files[0];
    //if file exists (image is picked) then add doc with tweetImg
    if (file) {
      const random = uuid();
      const storageRef = await ref(
        storage,
        `tweets/${currentUser.uid}${random}`
      );
      uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setError(undefined);
          //upload to database
          const dataImg = {
            createdById: currentUser.uid,
            createdByEmail: currentUser.email,
            date: new Date(),
            tweetTxt: tweetTxt,
            tweetImg: downloadURL,
            comments: [],
            likes: [],
          };
          addDoc(collection(db, "tweets"), dataImg);
        });
      });
      //if file doesnt exist (image isnt picked) then add doc with without tweetimg
    } else {
      //upload to database
      const data = {
        createdById: currentUser.uid,
        createdByEmail: currentUser.email,
        date: new Date(),
        tweetTxt: tweetTxt,
        comments: [],
        likes: [],
      };
      await addDoc(collection(db, "tweets"), data);
      //add to user document
    }

    //reset input
    setTweetTxt(""),
      (inputFile.value = null),
      (err) => {
        setError(err);
      };
  }

  return (
    <div className="AddTweet flex flex-col justify-center ">
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
          value={tweetTxt}
          onChange={(e) => setTweetTxt(e.target.value)}
        ></textarea>
        <input
          className="border-2 p-2"
          type="file"
          accept="image/png, image/jpeg"
          id="file"
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
