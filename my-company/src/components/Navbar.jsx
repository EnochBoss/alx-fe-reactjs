import React from 'react'

function Navbar() {
  return (
    <div>
        <nav>
        <ul style={{listStyle:'none'}}>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar