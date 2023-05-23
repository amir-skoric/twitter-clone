//imports
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";

import { useAuth } from "../contexts/AuthContext";

const ProfileSettings = () => {
  const [error, setError] = useState();
  const { currentUser, signout } = useAuth();

  //function that handles the "signout method" from firebase
  async function handleSignOut() {
    try {
      await signout();
    } catch (err) {
      setError(err);
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
        querySnapshot
          .forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = (doc.id, " => ", doc.data());
            await updateDoc(querySnapshot, {
              profilePic: downloadURL,
            });
          },
          )
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
        <button
          className="p-2 bg-blue-400 text-white w-full mt-44"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
