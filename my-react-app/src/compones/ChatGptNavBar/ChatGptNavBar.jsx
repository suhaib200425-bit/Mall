import React, { useState } from "react";
import "./ChatGptNavBar.css";
import { FaSearch, FaUser, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";

const ChatGptNavBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">FOREVER<span>.</span></div>

        {/* Nav Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="/">HOME</a></li>
          <li><a href="/collection">COLLECTION</a></li>
          <li><a href="/about">ABOUT</a></li>
          <li><a href="/contact">CONTACT</a></li>
        </ul>

        {/* Right Icons */}
        <div className="nav-icons">
          <div className="search-box-wrapper">
            {showSearch && (
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            )}
            <FaSearch
              className="icon"
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>

          <FaUser className="icon" />
          <FaShoppingBag className="icon" />

          {/* Mobile Menu Toggle */}
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ChatGptNavBar;