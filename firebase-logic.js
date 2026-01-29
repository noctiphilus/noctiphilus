// Import Firebase functions from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: User must replace this with their own config
const firebaseConfig = {
  apiKey: "AIzaSyCFKzPiOA1Pbv2IjcU9PkRq-rjoIWXFw5Q",
  authDomain: "noctiphilusblog.firebaseapp.com",
  projectId: "noctiphilusblog",
  storageBucket: "noctiphilusblog.firebasestorage.app",
  messagingSenderId: "287861825181",
  appId: "1:287861825181:web:4bac1c84b2decb8a213e74"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to create a new post
export async function createPost(postData) {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            title: postData.title,
            image: postData.image,
            content: postData.content,
            date: postData.date,
            timestamp: Date.now() // For easier sorting
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

// Function to get all posts
export async function getPosts() {
    const posts = [];
    try {
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
        });
        return posts;
    } catch (e) {
        console.error("Error getting documents: ", e);
        // If error (likely config missing), return empty to handle gracefully
        return [];
    }
}
