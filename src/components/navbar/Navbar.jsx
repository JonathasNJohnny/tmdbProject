import React from 'react';
import { Nav, Logo, Menu, MenuItem } from './Navbar.styles';

const Navbar = () => {
  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Logo className="navbar-brand" href="#">Logo</Logo>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <Menu className="navbar-nav ml-auto">
          <MenuItem className="nav-item">
            <span className="nav-link">Home</span>
          </MenuItem>
          <MenuItem className="nav-item">
            <span className="nav-link" href="#">About</span>
          </MenuItem>
          <MenuItem className="nav-item">
            <span className="nav-link" href="#">Services</span>
          </MenuItem>
          <MenuItem className="nav-item">
            <span className="nav-link" href="#">Contact</span>
          </MenuItem>
        </Menu>
      </div>
    </Nav>
  );
};

export default Navbar;
