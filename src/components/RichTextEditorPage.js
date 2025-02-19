import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/RichTextEditorPage.css";

const RichTextEditorPage = () => {
  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userFormData") || "{}");

  // Initialize editor text from localStorage or generate a template if user data exists
  const [text, setText] = useState(() => {
    const savedText = localStorage.getItem("richText");
    if (savedText) return savedText;

    // If user data exists, prefill the editor with user details
    if (userData.name) {
      return `<h1>User Profile</h1>
<p><strong>Name:</strong> ${userData.name || "N/A"}</p>
<p><strong>Email:</strong> ${userData.email || "N/A"}</p>
<p><strong>Phone:</strong> ${userData.phone || "N/A"}</p>
<p><strong>Address:</strong> ${userData.address || "N/A"}</p>
<p><strong>User ID:</strong> ${userData.id || "Not generated yet"}</p>
<h2>Additional Notes</h2>
<p>Add your notes here...</p>`;
    }

    return "";
  });

  // Save editor content to localStorage whenever text changes
  useEffect(() => {
    localStorage.setItem("richText", text);
  }, [text]);

  // Warn the user if they try to leave with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (text !== "") {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [text]);

  // Define the toolbar options for the rich text editor
  const modules = {
    toolbar: [
      [{ font: [] }], // Font selection
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header styles
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ color: [] }, { background: [] }], // Text color & background color
      [{ list: "ordered" }, { list: "bullet" }], // List formatting
      [{ align: [] }], // Text alignment
      [{ script: "sub" }, { script: "super" }], // Subscript & Superscript
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      ["blockquote", "code-block"], // Blockquote and code block
      ["link", "image"], // Insert links & images
      ["clean"], // Clear formatting
    ],
  };

  // Define the formatting options allowed in the editor
  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "script",
    "indent",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  // Function to load user data into the editor
  const loadUserData = () => {
    const freshUserData = JSON.parse(localStorage.getItem("userFormData") || "{}");
    
    // Check if user data exists
    if (freshUserData.name) {
      setText(`<h1>User Profile</h1>
<p><strong>Name:</strong> ${freshUserData.name || "N/A"}</p>
<p><strong>Email:</strong> ${freshUserData.email || "N/A"}</p>
<p><strong>Phone:</strong> ${freshUserData.phone || "N/A"}</p>
<p><strong>Address:</strong> ${freshUserData.address || "N/A"}</p>
<p><strong>User ID:</strong> ${freshUserData.id || "Not generated yet"}</p>
<h2>Additional Notes</h2>
<p>Add your notes here...</p>`);
    } else {
      alert("No user data found. Please create a user profile first.");
    }
  };

  // Function to clear the editor content
  const clearEditor = () => {
    if (window.confirm("Are you sure you want to clear the editor? This action cannot be undone.")) {
      setText(""); // Reset the editor content
    }
  };

  return (
    <div className="editor-page">
      <div className="editor-container">
        <h2>Rich Text Editor</h2>
        
        {/* Buttons to load user data and clear the editor */}
        <div className="editor-actions">
          <button onClick={loadUserData} className="load-data-btn">
            Load User Data
          </button>
          <button onClick={clearEditor} className="clear-editor-btn">
            Clear Editor
          </button>
        </div>
        
        {/* Rich text editor component */}
        <ReactQuill
          value={text}
          onChange={setText}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </div>
    </div>
  );
};

export default RichTextEditorPage;
