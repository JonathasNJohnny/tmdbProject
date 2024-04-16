import React from "react";
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import InputSearch1 from "../components/InputSearch1"
import Dropdown1 from "../components/Dropdown1";

export const Homepage = () => {
    return (
            <div>
                <Navbar/>
                <Filters>
                    <InputSearch1 placeholder={'Search'}/>
                    <Dropdown1 placeholder={"Genre"}/>
                </Filters>
            </div>
    )
}

export default Homepage;

const Filters = styled.div`
  position: relative;
`;
