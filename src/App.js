import React, { useState } from "react";
import EmailPasswordAuth from "./EmailPasswordAuth";
import FacebookAuth from "./FacebookAuth";
import GithubAuth from "./GithubAuth";
import GoogleAuth from "./GoogleAuth";

const App = () => {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    error: "",
  });
  return (
    <div>
      <EmailPasswordAuth user={user} setUser={setUser} />
      <br />
      <FacebookAuth />
      <br />
      <GoogleAuth user={user} setUser={setUser} />
      <br />
      <GithubAuth />
    </div>
  );
};

export default App;
