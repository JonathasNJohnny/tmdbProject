import { Navbar } from "react-bootstrap";
import styled from 'styled-components'

export const Nav = styled.nav`
    width: 100%;
    background-color: #333;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Logo = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const Menu = styled.div`
  display: flex;
`;

export const MenuItem = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 20px;

  &:hover {
    color: lightgray;
  }
`;