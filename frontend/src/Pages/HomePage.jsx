import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaMoon, FaSun } from "react-icons/fa";

const NotesApp = () => {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);
  const [newNote, setNewNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() === "") return;
    if (editingIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === editingIndex ? newNote : note
      );
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, newNote]);
    }
    setNewNote("");
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    setNewNote(notes[index]);
    setEditingIndex(index);
  };

  const filteredNotes = notes.filter(note =>
    note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${darkMode ? "bg-gray-900 text-black" : "bg-gradient-to-r from-blue-500 to-purple-600 text-black"} min-h-screen p-6 flex items-center justify-center w-full`}> 
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-2xl border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center tracking-wide">📝 My Notes</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="text-2xl p-2 bg-gray-300 dark:bg-gray-600 rounded-full shadow-md transition duration-300">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <FaSearch className="text-gray-500 text-xl self-center sm:self-auto" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
          <input
            type="text"
            placeholder="Write your note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <button
            onClick={addNote}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg flex items-center justify-center transition duration-300 shadow-md text-lg w-full sm:w-auto"
          >
            {editingIndex !== null ? <FaEdit size={24} /> : <FaPlus size={24} />} 
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note, index) => (
            <div key={index} className="flex flex-col justify-between bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-blue-500">
              <p className="text-gray-800 dark:text-white font-medium text-lg mb-4 break-words">{note}</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => editNote(index)} className="text-yellow-600 hover:text-yellow-700 text-2xl transition duration-300"><FaEdit /></button>
                <button onClick={() => deleteNote(index)} className="text-red-600 hover:text-red-700 text-2xl transition duration-300"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
