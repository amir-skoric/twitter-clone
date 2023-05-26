//imports
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { storage, auth } from "../firebase/config";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import {
  updateProfile,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";

import { db } from "../firebase/config";

import { useAuth } from "../contexts/AuthContext";

const ProfileSettings = () => {
  //states
  const [error, setError] = useState();
  const [docs, setDocs] = useState([]);
  const { currentUser, signout } = useAuth();

  //function that handles the "signout method" from firebase
  async function handleSignOut() {
    try {
      await signout();
    } catch (err) {
      setError(err);
    }
  }

  //function that sends an email password change link thing
  function changePassword() {
    sendPasswordResetEmail(auth, currentUser.email).then(() => {
      alert(
        "An e-mail with instructions on how to reset your password has been sent to your e-mail address. You will be logged out for security reasons."
      );
      signout();
    });
  }

  //function that deletes the current user from auth, deletes their profile pic and tweets and also comments
  async function handleDeleteAccount() {
    try {
      /*DOES NOT WORK
      //query search for all comments made by the current user
      const qComments = query(
        collection(db, "tweets"),
        where("comments", "array-contains", [{ createdById: currentUser.uid }])
      );
      const querySnapshotComments = await getDocs(qComments);
      //if there are any comments made by the user, delete them all
      if (!querySnapshotComments)
        querySnapshotComments.forEach(async (doc) => {
          await arrayRemove(doc.ref);
        });
      */

      //delete the current user
      await deleteUser(currentUser)
        .then(async () => {
          //query search for all tweets made by the current user
          const qTweets = query(
            collection(db, "tweets"),
            where("createdById", "==", currentUser.uid)
          );

          const querySnapshotTweets = await getDocs(qTweets);
          //if there are any tweets made by the user, delete them all
          if (!querySnapshotTweets) return;
          querySnapshotTweets.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            const data = doc.data();
            //deletes the img from storage (if a picture is attached to the tweet)
            const tweetImg = data.tweetImg.substring(151, 87);
            const storageRef = ref(storage, `tweets/${tweetImg}`);
            await deleteObject(storageRef);
          });

          //delete the current user docmuent
          await deleteDoc(doc(db, "users", currentUser.uid));
          //delete all likes from the current user
          const like = {
            like: currentUser.uid,
          };
          //query search for all likes made by the current user
          const qLikes = query(
            collection(db, "tweets"),
            where("likes", "array-contains", currentUser.uid)
          );
          //get all likes
          const querySnapshotLikes = await getDocs(qLikes);
          if (querySnapshotLikes) {
            querySnapshotLikes.forEach(async (doc) => {
              //delete likes from tweets
              await updateDoc(doc(db, "tweets", allTweets.id), {
                likes: arrayRemove(like),
              });
            });
          }
          //deleted the attached profile picture from the user
          if (
            currentUser.photoURL !==
            "https://firebasestorage.googleapis.com/v0/b/twitter-clone-8a93e.appspot.com/o/defaultProfilePic.png?alt=media&token=413e616a-5940-4007-813e-22b4827aaf46"
          ) {
            const storageRef = ref(
              storage,
              `profilePictures/${currentUser.uid}`
            );
            await deleteObject(storageRef);
          }
        })
        .catch((err) => {
          if (err.code === "auth/requires-recent-login") {
            setError(err);
            alert("Please re-log to confirm your identity.");
            signout();
            return;
          }
        });
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setError(err);
        alert("Please re-log to confirm your identity.");
        signout();
      }
    }
  }

  //function that submits a new profile pictures into firebase, and then updates it accordingly into the appropriate user
  async function handleSubmit(e) {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
    //upload to auth
    uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        updateProfile(currentUser, {
          photoURL: downloadURL,
        });
        //upload to database (user)
        await updateDoc(doc(db, "users", currentUser.uid), {
          profilePic: downloadURL,
        });

        //update existing tweets with new profile pic
        const q = await query(
          collection(db, "tweets"),
          where("createdById", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot) return;
        querySnapshot.forEach(async () => {
          await updateDoc(querySnapshot, {
            createdByPhotoURL: downloadURL,
          });
        });

        setError(undefined);
        window.location.reload();
      });
    });
    (err) => {
      setError(err);
    };
  }

  return (
    <div className="ProfileSettings flex flex-col justify-center px-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Account Details</h1>
      <p>
        <strong>E-mail:</strong> {currentUser.email}{" "}
      </p>
      <div className="text-red-400 text-center">
        {JSON.stringify(error && error.code)}
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 bg-gray-950 p-4 border-2 border-slate-800">
        <img
          className="rounded-full h-32 w-32 object-cover"
          src={currentUser.photoURL}
        ></img>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center p-4 bg-gray-950"
        >
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept="image/png, image/jpeg"
            required
          ></input>
          <button
            type="submit"
            className="p-2 bg-blue-400 text-white w-full mt-4"
          >
            Upload Picture
          </button>
        </form>
      </div>
      <div>
        <p className="text-center">
          An e-mail will be sent to you (reset link)
        </p>
        <button
          onClick={changePassword}
          className="p-2 bg-green-400 text-white w-full mt-4 mb-10"
        >
          Change Password
        </button>

        <button
          onClick={() => {
            const confirmBox = window.confirm(
              "Are you sure you want to delete your account? This will delete also delete all your tweets and comments"
            );
            if (confirmBox === true) {
              {
                handleDeleteAccount();
              }
            }
          }}
          className="p-2 bg-red-600 text-white w-full mt-4"
        >
          Delete Account
        </button>
        <button
          className="p-2 bg-blue-400 text-white w-full mt-4 mb-8"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
