// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpUKpbc76QYsnSRc-Rw1-El-bCCNM8qnM",
  authDomain: "moviesapi-5b372.firebaseapp.com",
  databaseURL: "https://moviesapi-5b372-default-rtdb.firebaseio.com",
  projectId: "moviesapi-5b372",
  storageBucket: "moviesapi-5b372.appspot.com",
  messagingSenderId: "542715812474",
  appId: "1:542715812474:web:29ff02cb9797cf8119b9c3",
  measurementId: "G-JEYYS6XXS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    alert('Login Successful!');
    // Redirect to dashboard or homepage
    window.location.href = "index.html"; // you can create dashboard.html if you want
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});
