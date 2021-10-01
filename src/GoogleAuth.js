import React from "react";
import firebase from "./firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

const GoogleAuth = ({ user, setUser }) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  const signInWithFirebase = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        const signOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        };
        setUser(signOutUser);
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={signInWithFirebase}>sign in with google</button>
      )}
    </div>
  );
};

export default GoogleAuth;
