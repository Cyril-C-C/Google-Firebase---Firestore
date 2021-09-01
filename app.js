import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-analytics.js';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDtxfkSilyWrtkCI9FnYbmWVTvMtpqpRiY',
  authDomain: 'fir-firestore-intro-aafa2.firebaseapp.com',
  projectId: 'fir-firestore-intro-aafa2',
  storageBucket: 'fir-firestore-intro-aafa2.appspot.com',
  messagingSenderId: '206417463819',
  appId: '1:206417463819:web:4c493e582e14168283150e',
  measurementId: 'G-3E4Y0N2QT3',
});

// Initialize Firebase
const app = initializeApp(firebaseApp);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);

const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = (recipe, id) => {
  let time = recipe.created_at.toDate();

  let html = `
    <li data-id="${id}">
        <div>${recipe.title}</div>
        <div>${time}</div>
        <button class="btn btn-danger btn-sm my-2">Delete</button>
    </li>
    `;

  list.innerHTML += html;
};

const deleteRecipe = (id) => {
  const recipes = document.querySelectorAll('li');
  recipes.forEach((recipe) => {
    if (recipe.getAttribute('data-id') === id) {
      recipe.remove();
    }
  });
};

// get documents
db.collection('recipes').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const doc = change.doc;
    if (change.type === 'added') {
      addRecipe(doc.data(), doc.id);
    } else if (change.type === 'removed') {
      deleteRecipe(doc.id);
    }
  });
});

// add documents
form.addEventListner('submit', (e) => {
  e.preventDefault();

  const now = new Date();
  const recipe = {
    title: form.recipe.value,
    created_at: firebaseConfig.firestore.Timestamp.fromDate(now),
  };

  db.collection('recipes')
    .add(recipe)
    .then(() => {
      console.log('recipe added');
    })
    .catch((err) => {
      console.log(err);
    });
});

// deleting data
list.addEventListner('click', (e) => {
  if (e.target.tagName === 'button') {
    const id = e.target.parentElement.getAttribute('data-id');

    db.collection('recipes')
      .doc(id)
      .delete()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
});
