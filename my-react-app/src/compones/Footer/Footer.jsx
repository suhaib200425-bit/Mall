import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <footer class="footer">
  <div class="footer-container">
    
    <div class="footer-section">
      <h2>Garuda Mall</h2>
      <p>Your trusted online shopping destination for fashion, electronics, and more.</p>
    </div>

    <div class="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Cart</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <div class="footer-section">
      <h3>Contact Us</h3>
      <p>Email: support@garudamall.com</p>
      <p>Phone: +91 98765 43210</p>
      <p>Location: Kerala, India</p>
    </div>

    <div class="footer-bottom">
      <p>© 2026 Garuda Mall. All rights reserved.</p>
    </div>

  </div>
</footer>
  )
}

export default Footer