import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import "./App.css";
import { auth, db } from "./init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  async function updatePost() {
    const hardcodedId = "kgY3u1VwQMLg6upumuBv";
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    console.log(post);
    const newPost = {
      ...post,
      title: "Land a $100k job",
    };
    console.log(newPost);
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardcodedId = "kgY3u1VwQMLg6upumuBv";
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    const post = postSnap.data();
    console.log(post);
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map((doc) => doc.data()));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
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
              {loading ? (
                <div className="loading">
                  <div className="loading__btn"></div>
                  <div className="loading__profile"></div>
                </div>
              ) : Object.keys(user).length === 0 ? (
                <>
                  <button className="btn login" onClick={login}>
                    Log in
                  </button>
                  <button className="btn register" onClick={register}>
                    Register
                  </button>
                </>
              ) : (
                <button className="user__initial" onClick={logout}>
                  {user.email[0]}
                </button>
              )}
            </div>
            {/* {loading ? "LOADING..." : } */}
            {/* <button onClick={logout}>Log out</button> */}
          </nav>
          <button onClick={createPost}>Create Post</button>
          <button onClick={getAllPosts}>Get All Posts</button>
          <button onClick={getPostById}>Get Post By Id</button>
          <button onClick={getPostByUid}>Get Post By Uid</button>
          <button onClick={updatePost}>Update Post</button>
          <button onClick={deletePost}>Delete Post</button>
        </div>
      </div>
    </div>
  );
}

export default App;
