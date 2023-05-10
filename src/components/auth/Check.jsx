//imports
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

//main function
const Check = () => {
  //states
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    //firebase onAuthStateChanged method to check if user is logged in
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  //signout function
  const userSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed in as: ${authUser.email}`}</p>
          <button className="p-2 border border-2" onClick={userSignOut}>
            Sign out
          </button>
        </>
      ) : (
        <p>Signed out</p>
      )}
    </div>
  );
};

export default Check;
