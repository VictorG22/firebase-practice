import React, { useEffect, useState } from "react";
import "./App.css";
import { auth } from "./init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <nav>
            <div className="logo">LOGO</div>
            <div className="user">
              {
                loading ? (
                 <div className="loading">
                   <div className="loading__btn"></div>
                   <div className="loading__profile"></div>
                 </div>
               ) :
               Object.keys(user).length === 0 ? (
                 <>
                  <button className="btn login" onClick={login}>
                    Log in
                  </button>
                  <button className="btn register" onClick={register}>
                    Register
                  </button>
                </>
              ) :
              (
               <button className="user__initial" onClick={logout}>{user.email[0]}</button>
             )
            }
            </div>
            {/* {loading ? "LOADING..." : } */}
            {/* <button onClick={logout}>Log out</button> */}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;
