import React from 'react';
import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({color1, color2, token}) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: 'mdi:home', label: 'Home', color: color1, route: '/'},
    { icon: 'mdi:account', label: 'Profile', color: color2, route: '/profile'}
  ];

  const handleNavigate = async (route) => {
    navigate(route, { state: { token } })
  }

  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <FlexContainer>
        <div>
          <Logo>TMDB_Project</Logo>
        </div>
        <div>
          <CustomDropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic">
              <span className="navbar-toggler-icon"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {menuItems.map((item, index) => (
                <Dropdown.Item key={index} onClick={() => handleNavigate(item.route)}>
                  <Icon icon={item.icon} style={{margin: '0 5px 1 0px'}}/>
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </CustomDropdown>
          <Menu>
            {menuItems.map((item, index) => (
              <MenuItem key={index} style={{color: item.color}} onClick={() => handleNavigate(item.route)}>
                <Icon icon={item.icon} style={{margin: '0 5px 1 0px'}}/>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
          </FlexContainer>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  width: 100%;
  padding: 10px;
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
`;

const Logo = styled.a`
  left: 0;
  margin-left: 15px;
  margin-right: 15px;
  width: fit-content;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Menu = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: 15px;
  @media (max-width: 767px) {
    display: none;
  }
`;

const MenuItem = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    color: #e7e7e7;
    text-decoration: none;
  }
`;

const CustomDropdown = styled(Dropdown)`

  width: fit-content;
  margin-left: auto;
  margin-right: 15px;

  .dropdown-toggle {
    border: none;
    background-color: transparent;
    outline: none;
    color: white;
    cursor: pointer;

    @media (min-width: 768px) {
      display: none;
    }

    @media (max-width: 767px) {
      .dropdown-toggle {
        display: block;
      }
    }
  }

  .dropdown-menu {
    background-color: #343a40;
  }

  .dropdown-item {
    color: white;
    padding: 10px 25px 10px 25px;
  }

  .dropdown-item:hover {
    background-color: #23272b;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
  width: 100%;
`;