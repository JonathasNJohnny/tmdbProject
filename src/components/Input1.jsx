import styled from 'styled-components';

export const Input1 = ({ type, placeholder, onChange }) => {
    return (
        <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={"bg-dark"}/>
    );
    };

export default Input1;

export const Input = styled.input`
  padding: 13px;
  margin: 15px 15px 15px 15px;
  justify-content: center;
  height: fit-content;
  width: fit-content;
  box-sizing: border-box;
  color: #f0ffff94;
  box-shadow: 0px 10px 40px #00000056;
  font-size: 12pt;
  border-radius: 15px;
  border: none;
  outline: none;

  ::placeholder {
    color: #f0ffff94;
  }
`;
