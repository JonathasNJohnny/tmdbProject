import React from "react";
import { styled, createGlobalStyle } from 'styled-components';
import Navbar from "../components/Navbar";
import InputSearch1 from "../components/InputSearch1"
import Dropdown1 from "../components/Dropdown1";
import TmdbContent from "../components/TmdbContent";

export const Homepage = () => {
    return (
            <div>
                <GlobalStyle/>
                <Navbar/>
                <HomepageBody>
                    <Filters>
                        <InputSearch1 placeholder={'Search'}/>
                        <Dropdown1 placeholder={"Type"}/>
                        <Dropdown1 placeholder={"Genre"}/>
                    </Filters>
                    <Content>
                        <TmdbContent/>
                    </Content>
                </HomepageBody>
            </div>
    )
}

export default Homepage;

const HomepageBody = styled.div`
    position: relative;
    background-color: #252524;
    width: 100vw;
`;

const Filters = styled.div`
    margin-left: 5%;
    padding-top: 80px;
    flex-direction: column;
    width: fit-content;
`;

const Content = styled.div`
    
`;

const GlobalStyle = createGlobalStyle`
    body {
        overflow-x: hidden;
    };
`;