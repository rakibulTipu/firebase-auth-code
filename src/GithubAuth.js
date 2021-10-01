import React, { useState } from "react";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const GithubAuth = () => {
  const [user, setUser] = useState({});
  const provider = new GithubAuthProvider();

  const githubLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser(user);
        // ...
        console.log(token, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  return (
    <div>
      <button onClick={githubLogin}>Log in with github</button>
      <h1>email: {user.email}</h1>
      <img src={user.photoURL} alt="" />
    </div>
  );
};

export default GithubAuth;
