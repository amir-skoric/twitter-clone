//imports
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import LoadingForm from "./loading/LoadingForm";

import { v4 as uuid } from "uuid";

const AddTweet = () => {
  //states
  const [tweetTxt, setTweetTxt] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const loadingSpinner = () => {
    if (loading) return <LoadingForm />;
    else {
      return (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-white bg-inherit"
        >
          <textarea
            className="border-2 border-slate-800 p-2 resize-none bg-gray-950"
            maxLength="280"
            rows="6"
            type="text"
            placeholder="Tell the world what you're thinking about!"
            required
            value={tweetTxt}
            onChange={(e) => setTweetTxt(e.target.value)}
          ></textarea>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400"
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
      );
    }
  };

  //submit a new tweet
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let inputFile = document.getElementById("file");
    const file = inputFile.files[0];
    //if file exists (image is picked) then add doc with tweetImg
    if (file) {
      //date initialization
      let a = new Date();
      let dateoptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const date = a.toLocaleDateString("da-DK", dateoptions);
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
            createdByPhotoURL: currentUser.photoURL,
            date: date,
            tweetTxt: tweetTxt,
            tweetImg: downloadURL,
            comments: [],
            likes: [],
          };
          addDoc(collection(db, "tweets"), dataImg);
          setLoading(false);
        });
      });
      //if file doesnt exist (image isnt picked) then add doc with without tweetimg
    } else {
      //date initialization
      let a = new Date();
      let dateoptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const date = a.toLocaleDateString("da-DK", dateoptions);
      //upload to database
      const data = {
        createdById: currentUser.uid,
        createdByEmail: currentUser.email,
        createdByPhotoURL: currentUser.photoURL,
        date: date,
        tweetTxt: tweetTxt,
        comments: [],
        likes: [],
      };
      await addDoc(collection(db, "tweets"), data);
      setLoading(false);
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
      {loadingSpinner()}
      <div className="w-100 text-center mt-4"></div>
    </div>
  );
};

export default AddTweet;
