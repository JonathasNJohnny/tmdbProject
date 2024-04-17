import styled from 'styled-components';

export const Button1 = ({ type, placeholder, onClick }) => {

    const handleClick = (event) => {
        const buttonValue = event.target.value.trim();
        onClick(buttonValue);
    };

    return (
        <Button
        type={type}
        onClick={handleClick}>
          {placeholder}
        </Button>
    );
    };

export default Button1;

export const Button = styled.button`
  width: 100%;
  background-color: #343a40;
  color: #f0ffff94;
  box-shadow: 0px 10px 40px #00000056;
  font-size: 12pt;
  border-radius: 15px;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #3b4147;
  }
`;
