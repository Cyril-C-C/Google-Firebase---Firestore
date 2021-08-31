
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDtxfkSilyWrtkCI9FnYbmWVTvMtpqpRiY",
  authDomain: "fir-firestore-intro-aafa2.firebaseapp.com",
  projectId: "fir-firestore-intro-aafa2",
  storageBucket: "fir-firestore-intro-aafa2.appspot.com",
  messagingSenderId: "206417463819",
  appId: "1:206417463819:web:4c493e582e14168283150e",
  measurementId: "G-3E4Y0N2QT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);



const list = document.querySelector('ul');

const addRecipe = (recipe) => {
  let time = recipe.created_at.toDate();
  console.log(recipe.created_at);
  let html = `
    <li>
        <div>${recipe.title}</div>
        <div>${time}</div>
    </li>
    `;

  list.innerHTML += html;
};

db.collection('recipes')
  .get()
  .then((snapshot) => {
    // when we have the data
    snapshot.docs.forEach(doc => {
      addRecipe(doc.data());
    });
  })
  .catch(err => {
    console.log(err);
  });
  