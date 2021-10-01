import React from "react";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
const FacebookAuth = () => {
  const fbProvider = new FacebookAuthProvider();
  const handleFacebook = () => {
    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  return (
    <div>
      <button onClick={handleFacebook}>facebook sign in</button>
    </div>
  );
};

export default FacebookAuth;
