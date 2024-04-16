import styled from 'styled-components';

export const InputSearch1 = ({type, placeholder, onChange}) => {
    return (
        <Input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
          />
    )
}

export default InputSearch1;

export const Input = styled.input`
    justify-content: center;
    box-sizing: border-box;
    color: #f0ffffde;
    box-shadow: 0px 10px 40px #00000056;
    padding: 12px 10px 12px 35px;
    font-size: 12pt;
    border-radius: 15px;
    border: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 32 32'%3E%3Cpath fill='%23adadad' d='M19.5 3C14.265 3 10 7.265 10 12.5c0 2.25.81 4.307 2.125 5.938L3.28 27.28l1.44 1.44l8.843-8.845C15.192 21.19 17.25 22 19.5 22c5.235 0 9.5-4.265 9.5-9.5S24.735 3 19.5 3m0 2c4.154 0 7.5 3.346 7.5 7.5S23.654 20 19.5 20S12 16.654 12 12.5S15.346 5 19.5 5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: left 10px top 50%;
    background-size: 20px;
    outline: none;

    .style::placeholder {
    color: #f0ffff94;

    }
`;
