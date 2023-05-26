//imports
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { storage } from "../firebase/config";
import { deleteObject, ref } from "firebase/storage";

import { useAuth } from "../contexts/AuthContext";
import {
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/config";

const Tweet = ({ allTweets }) => {
  //states
  const [comment, setComment] = useState("");
  const [error, setError] = useState();
  const { currentUser } = useAuth();

  //add comment
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (comment) {
        const commentObj = {
          createdById: currentUser.uid,
          createdByEmail: currentUser.email,
          createdByPhotoURL: currentUser.photoURL,
          commentTxt: comment,
        };

        await updateDoc(doc(db, "tweets", allTweets.id), {
          comments: arrayUnion(commentObj),
        });
      } else {
        alert("Your comment can't be empty");
      }
    } catch (err) {
      setError(err);
    }
    setComment("");
  }

  //add like
  async function handleLikeAdd() {
    try {
      const like = currentUser.uid;
      await updateDoc(doc(db, "tweets", allTweets.id), {
        likes: arrayUnion(like),
      });
    } catch (err) {
      setError(err);
    }
  }

  //remove like
  async function handleLikeDelete() {
    try {
      const like = currentUser.uid;
      await updateDoc(doc(db, "tweets", allTweets.id), {
        likes: arrayRemove(like),
      });
    } catch (err) {
      setError(err);
    }
  }

  //delete tweet
  async function handleDeleteTweet() {
    //tweet img converter (takes the photoURL link and turns it into a usable reference)
    const tweetImg = allTweets.tweetImg?.substring(151, 87);

    if (tweetImg) {
      const storageRef = ref(storage, `tweets/${tweetImg}`);
      await deleteObject(storageRef)
        .then(() => {
          deleteDoc(doc(db, "tweets", allTweets.id));
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    } else {
      deleteDoc(doc(db, "tweets", allTweets.id));
    }
  }

  //like button conditionally change fill if the current user logged in has liked the tweet
  function likeButton() {
    if (!allTweets.likes.includes(currentUser.uid)) {
      return (
        <button onClick={handleLikeAdd}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bg-inherit"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />{" "}
          </svg>
        </button>
      );
    } else {
      return (
        <button onClick={handleLikeDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="red"
            className="bg-inherit"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />{" "}
          </svg>
        </button>
      );
    }
  }

  //function that renders the tweetimg conditionally (if it exists or not)
  function imgConditionalRender() {
    if (!allTweets.tweetImg) {
      return;
    } else {
      return (
        <img
          src={allTweets.tweetImg}
          className="object-cover h-80 w-80 border-2 border-slate-900"
        ></img>
      );
    }
  }

  //function that renders the comments if they exist or not
  function commentsConditionalRender() {
    if (allTweets.comments.length === 0) {
      return <p className="bg-inherit">No comments</p>;
    } else {
      return (
        <div className="bg-inherit flex flex-col">
          {allTweets.comments.map((comments, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 my-4 bg-inherit"
            >
              <img
                src={comments.createdByPhotoURL}
                className="h-10 w-10 rounded-full"
              ></img>

              <div className="flex flex-row space-x-4 bg-inherit items-center">
                <div className="bg-inherit flex flex-col">
                  <p className="bg-inherit font-bold">
                    {comments.createdByEmail}
                  </p>
                  <p className="bg-inherit">{comments.commentTxt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  //delete tweet button conditional
  function deleteButtonConditionallyRender() {
    if (allTweets.createdById === currentUser.uid) {
      return (
        <div className="bg-inherit">
          <button
            onClick={() => {
              const confirmBox = window.confirm(
                "Are you sure you want to delete this tweet?"
              );
              if (confirmBox === true) {
                {
                  handleDeleteTweet();
                }
              }
            }}
            className="p-2 bg-red-600 text-white w-full mt-4"
          >
            Delete Tweet
          </button>
        </div>
      );
    }
  }

  //follow button conditional
  function followButtonConditionallyRender() {
    const getUser = async () => {
      const docRef = doc(db, "users", allTweets.createdById);
      const docSnap = await getDoc(docRef);
      const user = docSnap.data();
      const userData = user.id;
      return userData;
    };
    if (allTweets.createdById === currentUser.uid) {
      return;
    } else if (currentUser.uid != getUser()) {
      return (
        <button onClick={follow} className="bg-blue-400 text-white px-4 py-2">
          Follow
        </button>
      );
    } else {
      return (
        <button onClick={unfollow} className="bg-blue-400 text-white px-4 py-2">
          Unfollow
        </button>
      );
    }
  }

  //follow function
  async function follow() {
    try {
      const follow = allTweets.createdById;
      await updateDoc(doc(db, "users", currentUser.id), {
        following: arrayUnion(follow),
      });
      await updateDoc(doc(db, "users", allTweets.createdById), {
        followers: arrayUnion(follow),
      });
    } catch (err) {
      setError(err);
    }
  }

  //unfollow function
  async function unfollow() {
    try {
      const follow = allTweets.createdById;
      await updateDoc(doc(db, "users", currentUser.id), {
        following: arrayRemove(follow),
      });
      await updateDoc(doc(db, "users", allTweets.createdById), {
        followers: arrayRemove(follow),
      });
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className="Tweet flex flex-col p-4 border-2 border-slate-800 my-8 bg-gray-950">
      <div className="flex flex-row items-center justify-center space-x-4 border-slate-600 border-b-2 border-spacing-y-2 pb-4 bg-gray-950">
        <Link
          className="bg-inherit"
          to={`/user/${allTweets.createdById}`}
          state={{ allTweets }}
        >
          <img
            src={allTweets.createdByPhotoURL}
            className="h-12 w-12 rounded-full object-cover"
          ></img>
        </Link>
        <p className="bg-inherit">{allTweets.createdByEmail}</p>
        {followButtonConditionallyRender()}
      </div>
      <div className="text-red-400 text-center mt-8">
        {JSON.stringify(error && error.code)}
      </div>
      <div className="flex flex-col mt-4 justify-center bg-inherit">
        <p className="mb-8 bg-inherit font-thin">{allTweets.tweetTxt}</p>
        {imgConditionalRender()}
      </div>
      <div className="flex flex-col justify-center items-center bg-inherit mt-6">
        {likeButton()}
        <p className="bg-inherit">{allTweets.likes.length}</p>
      </div>
      <div className="bg-inherit mt-8">
        <p className="bg-inherit font-bold">Date</p>
        <p className="bg-inherit italic">{allTweets.date}</p>
      </div>
      {deleteButtonConditionallyRender()}
      <div className="bg-gray-950 space-y-4 mt-4">
        <h1 className="text-lg font-bold bg-inherit underline underline-offset-4">
          Comments
        </h1>
        <form
          className="flex flex-row space-x-4 bg-inherit"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full border-2 p-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button type="submit" className="bg-blue-400 text-white px-4">
            Submit
          </button>
        </form>
        {commentsConditionalRender()}
      </div>
    </div>
  );
};

export default Tweet;
