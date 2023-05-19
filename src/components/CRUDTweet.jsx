import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { addDoc } from 'firebase/firestore';

const AddTweet = () => {

//states
const [tweet, setTweet] = useState("");
const [tweetImg, setTweetImg] = useState("");
const [error, setError] = useState();
const { currentUser } = useAuth();

async function handleSubmit(e) {
  e.preventDefault();
  try {
    await signup(email, password, displayName, photoURL);
  } catch (err) {
    setError(err);
  } 
}

return (
  <div className="SignUp flex flex-col justify-center ">
    <h2 className="text-xl bg-inherit mb-4">What's on your mind?</h2>
    <form
      className="flex flex-col space-y-4 text-white bg-inherit"
      onSubmit={handleSubmit}
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
        placeholder="Add an image to your tweet"
      ></input>
      <button
        className="p-2 mx-auto bg-blue-400 text-white w-full"
        type="submit"
      >
        Send Tweet
      </button>
      <div className="text-red-400 text-center">
        {JSON.stringify(error && error.code)}
      </div>
    </form>
    <div className="w-100 text-center mt-4">
    </div>
  </div>
)
}

export default AddTweet;
