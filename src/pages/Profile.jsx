import React, { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";

import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
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
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateProfile(currentUser, {
            photoURL: downloadURL,
          });
          setError(undefined);
          window.location.reload();
        });
      },
      (err) => {
        setError(err);
      }
    );
  }

  return (
    <div className="Profile flex flex-col justify-center px-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Account Details</h1>
      <p>
        <strong>E-mail:</strong> {currentUser.email}{" "}
      </p>
      <p>
        <strong>Display Name</strong> <em>(can be empty)</em>:{" "}
        {currentUser.displayName || currentUser.email}{" "}
      </p>
      <div className="text-red-400 text-center">
        {JSON.stringify(error && error.code)}
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <img
          className="rounded-full h-32 w-32 object-cover"
          src={currentUser.photoURL}
        ></img>
        <form onSubmit={handleSubmit}>
          <input type="file"></input>
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
          className="p-2 bg-blue-400 text-white w-full mt-4"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
