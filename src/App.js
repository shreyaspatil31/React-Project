import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CounterPage from "./components/CounterPage"; // Import CounterPage component
import UserFormPage from "./components/UserFormPage"; // Import UserFormPage component
import RichTextEditorPage from "./components/RichTextEditorPage"; // Import RichTextEditorPage component
import Dashboard from "./components/Dashboard"; // Import Dashboard component
import "./styles/styles.css"; // Import global styles

const App = () => {
  return (
    // Wrap the entire application in a Router for routing functionality
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          {/* Logo Section */}
          <div className="logo">
            React App
          </div>

          {/* Navigation Links */}
          <div className="nav-links">
            {/* Each link navigates to a different route */}
            <Link to="/" className="nav-link">Counter</Link>
            <Link to="/form" className="nav-link">User Form</Link>
            <Link to="/editor" className="nav-link">Rich Text Editor</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </div>
        </nav>

        {/* Main content area where components will render */}
        <main className="main-content">
          {/* Define Routes to display the respective components */}
          <Routes>
            {/* Route to display the CounterPage component at the root path */}
            <Route path="/" element={<CounterPage />} />
            {/* Route to display the UserFormPage component at '/form' */}
            <Route path="/form" element={<UserFormPage />} />
            {/* Route to display the RichTextEditorPage component at '/editor' */}
            <Route path="/editor" element={<RichTextEditorPage />} />
            {/* Route to display the Dashboard component at '/dashboard' */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
