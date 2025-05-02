// src/firebaseUtils.js - Firestore Interactions
import { db, auth } from './firebaseConfig';
import {
    collection,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    writeBatch,
    query,
    where,
    orderBy,
    limit,
    Timestamp,  // Correct import if needed, often serverTimestamp is enough
    increment,
    serverTimestamp, // Use server timestamp for consistency
    onSnapshot, // For realtime updates
    addDoc // For adding comments
} from "firebase/firestore";

// --- VIDEOS ---
// Assumes 'videos' collection, doc ID is videoId
// Doc fields: title, viewCount, likeCount, dislikeCount, description, etc.

export const incrementViewCount = async (videoId) => {
    if (!videoId || typeof videoId !== 'string' || videoId.trim() === '') {
        console.error("Invalid videoId for incrementViewCount:", videoId);
        return;
    }
    const videoRef = doc(db, "videos", videoId);
    try {
        // Set with merge: creates doc if needed, increments if exists
        await setDoc(videoRef, { viewCount: increment(1) }, { merge: true });
        console.log("View count incremented for", videoId);
    } catch (error) {
        console.error("Error incrementing view count for", videoId, ":", error);
    }
};

// Listen to realtime video data (counts, title etc.)
export const listenToVideoData = (videoId, callback) => {
     if (!videoId || typeof videoId !== 'string' || videoId.trim() === '') {
        console.error("Invalid videoId for listenToVideoData:", videoId);
        callback(null); return () => {};
     }
    const videoRef = doc(db, "videos", videoId);
    console.log("Listening to video data for:", videoId);
    const unsubscribe = onSnapshot(videoRef, (docSnap) => {
        if (docSnap.exists()) {
            // Provide default values for counts if they don't exist yet
            const data = docSnap.data();
            callback({
                likeCount: data.likeCount ?? 0,
                dislikeCount: data.dislikeCount ?? 0,
                viewCount: data.viewCount ?? 0,
                ...data // Include other fields like title, description
            });
        } else {
            console.warn("No video data found for:", videoId, "- Creating basic doc?");
             // Optionally create a basic doc here if needed, or just return defaults
             callback({ likeCount: 0, dislikeCount: 0, viewCount: 1, title: 'Video Data Missing', description: '' }); // Default values
        }
    }, (error) => {
         console.error("Error listening to video data:", videoId, error);
         callback(null);
    });
    return unsubscribe; // Return the function to stop listening
};


// --- LIKES / DISLIKES ---
// Assumes 'likes' collection, doc ID: `${userId}_${videoId}`
// Doc fields: userId, videoId, type ('like' | 'dislike'), timestamp

// Get initial like status for current user
export const getLikeStatus = async (videoId) => {
    const user = auth.currentUser;
    if (!user || !videoId || typeof videoId !== 'string' || videoId.trim() === '') return null;

    const likeId = `${user.uid}_${videoId}`;
    const likeRef = doc(db, "likes", likeId);
    try {
        const docSnap = await getDoc(likeRef);
        return docSnap.exists() ? docSnap.data().type : null;
    } catch (error) {
        console.error("Error getting like status:", error);
        return null;
    }
};

// Set like/dislike status atomically
export const setLikeStatus = async (videoId, newStatus) => { // newStatus: 'like', 'dislike', or null
    const user = auth.currentUser;
     if (!user || !videoId || typeof videoId !== 'string' || videoId.trim() === '') {
        console.error("Cannot set like status: missing user or videoId", {userId: user?.uid, videoId});
        return false;
    }

    const likeId = `${user.uid}_${videoId}`;
    const likeRef = doc(db, "likes", likeId);
    const videoRef = doc(db, "videos", videoId);

    try {
        const currentLikeSnap = await getDoc(likeRef);
        const currentStatus = currentLikeSnap.exists() ? currentLikeSnap.data().type : null;

        // If current status is same as new status, do nothing (already set)
        // Exception: If newStatus is null, we always proceed to delete.
        if (currentStatus === newStatus && newStatus !== null) {
            console.log("Like status already set to", newStatus);
            return true; // Already in desired state
        }

        const batch = writeBatch(db);
        let likeIncrement = 0;
        let dislikeIncrement = 0;

        // Determine increments based on transition
        if (newStatus === 'like') {
            likeIncrement = 1;
            if (currentStatus === 'dislike') dislikeIncrement = -1; // Was disliked, remove dislike
            batch.set(likeRef, { userId: user.uid, videoId, type: 'like', timestamp: serverTimestamp() });
        } else if (newStatus === 'dislike') {
            dislikeIncrement = 1;
            if (currentStatus === 'like') likeIncrement = -1; // Was liked, remove like
            batch.set(likeRef, { userId: user.uid, videoId, type: 'dislike', timestamp: serverTimestamp() });
        } else { // newStatus is null (removing)
            if (currentStatus === 'like') likeIncrement = -1;
            if (currentStatus === 'dislike') dislikeIncrement = -1;
            if (currentLikeSnap.exists()) batch.delete(likeRef); // Delete only if it exists
        }

        // Prepare video count update object only if counts change
        const videoUpdateData = {};
        if (likeIncrement !== 0) videoUpdateData.likeCount = increment(likeIncrement);
        if (dislikeIncrement !== 0) videoUpdateData.dislikeCount = increment(dislikeIncrement);

        // Add video update to batch only if there are changes
        if (Object.keys(videoUpdateData).length > 0) {
             // Using set with merge handles document creation if it doesn't exist
             batch.set(videoRef, videoUpdateData, { merge: true });
        }

        await batch.commit();
        console.log(`Like status updated: ${currentStatus} -> ${newStatus} for video ${videoId}`);
        return true;

    } catch (error) {
        console.error("Error setting like status:", error);
        return false;
    }
};


// --- COMMENTS ---
// Assumes 'comments' collection
// Doc fields: videoId, userId, userName, userPhotoURL, text, timestamp

export const addComment = async (videoId, text) => {
    const user = auth.currentUser;
    if (!user || !videoId || typeof videoId !== 'string' || videoId.trim() === '' || !text || typeof text !== 'string' || text.trim() === '') {
         console.error("Cannot add comment: missing data", {userId: user?.uid, videoId, text});
         return null;
    }

    try {
        const commentsColRef = collection(db, "comments");
        const newCommentData = {
            videoId: videoId,
            userId: user.uid,
            userName: user.displayName || user.email || "Anonymous", // Best available name
            userPhotoURL: user.photoURL || null, // User's photo
            text: text.trim(),
            timestamp: serverTimestamp() // Use server time
        };
        const docRef = await addDoc(commentsColRef, newCommentData);
        console.log("Comment added with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding comment: ", error);
        return null;
    }
};

// Listen for realtime comments
export const listenToComments = (videoId, callback) => {
     if (!videoId || typeof videoId !== 'string' || videoId.trim() === '') {
        console.error("Invalid videoId for listenToComments:", videoId);
        callback([]); return () => {};
     }
    const commentsColRef = collection(db, "comments");
    const q = query(
        commentsColRef,
        where("videoId", "==", videoId),
        orderBy("timestamp", "desc"), // Show newest first
        limit(50) // Limit initial load + listener scope
    );

    console.log("Listening for comments for video:", videoId);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const commentsData = [];
        querySnapshot.forEach((doc) => {
            commentsData.push({ id: doc.id, ...doc.data() });
        });
        console.log(`Received ${commentsData.length} comments via listener`);
        callback(commentsData); // Update component state
    }, (error) => {
        console.error("Error listening to comments:", videoId, error);
        callback([]);
    });

    return unsubscribe; // Return function to stop listening
};