import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "../firebase-config";
import { signOut } from "firebase/auth"; // Import signOut
import { auth } from "../firebase-config"; // Import auth from firebase-config
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import "./Notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const notesCollectionRef = collection(db, "notes");
  const navigate = useNavigate(); // Create navigate function

  // Fetch notes from Firestore for the current user
  const fetchNotes = async () => {
    const querySnapshot = await getDocs(notesCollectionRef);
    const notesList = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((note) => note.userId === auth.currentUser.uid); // Filter notes to only show the current user's notes
    setNotes(notesList);
  };

  // Add a new note with userId field
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (newNote.trim() === "") return;

    try {
      await addDoc(notesCollectionRef, {
        content: newNote,
        timestamp: new Date(),
        userId: auth.currentUser.uid, // Store user ID
      });
      setNewNote("");
      fetchNotes();
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteDoc(doc(db, "notes", noteId)); // Use doc with deleteDoc
      fetchNotes(); // Re-fetch notes after deletion
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  // Log out user and redirect to home page
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/"); // Redirect to home page after logout
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  // Fetch notes on initial render
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
      <h2>Your Notes</h2>
      <form onSubmit={handleAddNote} className="add-note-form">
        <textarea
          className="note-input"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a new note..."
        />
        <button type="submit" className="add-btn">
          Add Note
        </button>
      </form>
      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes available. Start adding some!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              <p>{note.content}</p>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Logout Button - Positioned at the bottom right */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Notes;
