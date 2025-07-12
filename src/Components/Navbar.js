import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  // This closes the menu when a link is clicked
  const handleNavLinkClick = () => setIsOpen(false);

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><b><i>GigaNEWS</i></b></Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggle}
            aria-controls="navbarSupportedContent"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse${isOpen ? " show" : ""}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link active" to="#" onClick={handleNavLinkClick}>Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business" onClick={handleNavLinkClick}>Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment" onClick={handleNavLinkClick}>Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/general" onClick={handleNavLinkClick}>General</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health" onClick={handleNavLinkClick}>Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science" onClick={handleNavLinkClick}>Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports" onClick={handleNavLinkClick}>Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology" onClick={handleNavLinkClick}>Technology</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
