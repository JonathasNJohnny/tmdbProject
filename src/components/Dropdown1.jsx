import React, { useState, useEffect, useRef } from 'react';
import { styled, createGlobalStyle } from 'styled-components';

const Dropdown1 = ({ placeholder, items = [], onTypeChange }) => {
  if (items.length === 0) {
    items = [['vazio', 0], ['vazio', 1], ['vazio', 2]];
  }
  const [isOpen, setIsOpen] = useState(false);
  const [actualPlaceholder, setActualPlaceholder] = useState(placeholder)
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (onTypeChange) {
      setActualPlaceholder(item[0])
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
      <DropdownButton onClick={toggleDropdown} >{actualPlaceholder}</DropdownButton>
      <DropdownContent $isOpen={isOpen} className={"bg-dark"}>
        <DropdownItemList>
          {items.map((item, index) => (
            <DropdownItem key={index} onClick={() => handleItemClick(item)}>{item[0]}</DropdownItem>
          ))}
        </DropdownItemList>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown1;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 20px 20px 0px 0;
`;

const DropdownButton = styled.button`
  background-color: #343a40;
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

  &:hover {
    background-color: #3b4147;
  }
`;

const DropdownContent = styled.div`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
`;

const DropdownItemList = styled.div`
  padding: 4px 0;
`;

const DropdownItem = styled.div`
  color: #f0ffff94;
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #3c444d;
    color: #f0ffff94;
  }
`;

const GlobalStyle = createGlobalStyle`
  body.dropdown-open {
    overflow: hidden;
  }
`;