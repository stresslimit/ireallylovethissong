import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore";
import CONFIG from './pages/config';

firebase.initializeApp(CONFIG);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

export const addVideo = (payload) => {
  return db.collection('videos')
    .add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      // createdBy: userId,
      ...payload,
    });
};

export const getVideos = () => {
  return db.collection("videos")
    .orderBy('created')
    .get();
};
