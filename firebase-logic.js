// Import Firebase functions from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: User must replace this with their own config
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "NUMERO",
    appId: "ID_APP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to create a new post
export async function createPost(postData) {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            title: postData.title,
            image: postData.image || "", // Optional
            content: postData.content, // HTML Support
            date: postData.date,
            timestamp: Date.now()
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

// Function to delete a post
export async function deletePost(postId) {
    try {
        await deleteDoc(doc(db, "posts", postId));
        console.log("Document deleted with ID: ", postId);
    } catch (e) {
        console.error("Error deleting document: ", e);
        throw e;
    }
}

// Function to update a post
export async function updatePost(postId, newData) {
    try {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, newData);
        console.log("Document updated with ID: ", postId);
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
}
