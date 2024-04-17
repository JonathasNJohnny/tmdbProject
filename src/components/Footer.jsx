import React from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';

export const Footer = ({ onSaveData, page }) => {

    const handleSaveData = (action) => { 
        onSaveData(action) 
        console.log(action) }
    

    return (
        <FooterDiv className={'text-center d-flex align-items-center justify-content-center text-secondary'}>
                <Icon icon="iconamoon:arrow-left-2-bold"  style={{cursor: 'pointer', margin: '0 10px 0 10px'}} onClick={() => handleSaveData(false)}/>
                <span>{page}</span>
                <Icon icon="iconamoon:arrow-right-2-bold"  style={{cursor: 'pointer', margin: '0 10px 0 10px'}} onClick={() => handleSaveData(true)}/>
        </FooterDiv>
    );
};

export default Footer;

const FooterDiv = styled.div`
    font-size: 80px;
    margin-top: 20px;
    color: white;
    width: 100%;

    span {
        font-size: 50px;
    }
`