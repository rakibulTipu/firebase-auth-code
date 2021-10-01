import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";

const EmailPasswordAuth = ({ user, setUser }) => {
  const [newUser, setNewUser] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser && user.email && user.password) {
      // PASSWORD create
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          // const user = userCredential.user;
          // ...
          // console.log(user);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.name && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log(res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
  };
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then((res) => {
        // Profile updated!
        // ...
        console.log(res);
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <br />

        {user.isSignedIn && (
          <div>
            <p>Welcome, {user.name}</p>
            <p>{user.email}</p>
            <img src={user.photo} alt="userImage" />
          </div>
        )}
      </div>

      <input
        type="checkbox"
        name="newUser"
        onChange={() => setNewUser(!newUser)}
      />
      <label htmlFor="newUser">New user sign in</label>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="name"
            onBlur={handleBlur}
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          placeholder="email"
          required
          onBlur={handleBlur}
        />
        <br />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onBlur={handleBlur}
        />
        <br />
        <input type="submit" value={newUser ? "sign up" : "sign in"} />
      </form>
      <h1 style={{ color: "red" }}>{user.error}</h1>
      <h1 style={{ color: "green" }}>
        User {newUser ? "created" : "logged-in"} successfully
      </h1>
    </>
  );
};

export default EmailPasswordAuth;
