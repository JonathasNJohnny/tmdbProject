import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Dropdown1 = ({ placeholder, items = [], onTypeChange }) => {
  if (items.length === 0) {
    items = [['vazio', 0], ['vazio', 1], ['vazio', 2]];
  }

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (onTypeChange) {
      onTypeChange(item[1])
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>{placeholder}</DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {items.map((item, index) => (
          <DropdownLink key={index} href="#" onClick={() => handleItemClick(item)}>{item[0]}</DropdownLink>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown1;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 20px;
`;

const DropdownButton = styled.button`
  background-color: #3a3a3b;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  color: #f0ffff94;
  box-shadow: 0px 10px 40px #00000056;
  min-width: 130px;
  padding: 12px 45px 12px 15px;
  font-size: 12pt;
  border-radius: 15px;
  outline: none;
  border: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='0.9em' height='1em' viewBox='0 0 630 700'%3E%3Cpath fill='%23adadad' d='M622 106L311 417L0 106l65-65l246 245L556 41z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 11px top 63%;
  background-size: 15px;

  &:focus {
    outline: none;
  }
`;

const DropdownContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  background-color: #343a40;
  position: absolute;
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
`;

const DropdownLink = styled.a`
  color: #f0ffff94;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #121212;
  }
`;