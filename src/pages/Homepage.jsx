import React, { useState, useEffect } from "react";
import { styled, createGlobalStyle } from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";
import InputSearch1 from "../components/InputSearch1"
import Dropdown1 from "../components/Dropdown1";
import TmdbContent from "../components/TmdbContent";
import Footer from "../components/Footer";
import DataBox from "../components/DataBox";

const API_KEY = '72685f398b32e9d77e422b1b37d21421';
const activatedColor = '#c0c0c0'

export const Homepage = () => {
    const navigate = useNavigate();
    const [allGenres, setAllGenres] = useState([]);
    const [genre, setGenre] = useState();
    const [which, setWhich] = useState('movie');
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [token, setToken] = useState('');
    const [showBox, setShowBox] = useState(false);
    const [contentId, setContentId] = useState('1011985')
    const location = useLocation();

    useEffect(() => {
        const fetchMovies = async () => {
            console.log(search)
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/genre/${which}/list?api_key=${API_KEY}`);
                setAllGenres(response.data.genres.map(genre => [genre.name, genre.id]))
                } 
            catch (error) {
                console.error('Erro ao buscar filmes:', error);
            }
        };
    
        fetchMovies();
        }, [which, search]);

    const handleContentClick = (set) => {
        setContentId(set)
        setShowBox(true);
    }

    const handleCloseBox = () => {
        setShowBox(false);
    }

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        //setNet(true);
    
        setTimeout(() => {
            //setNet(false);
        }, 800);
    }

    const handleGenreChange = (set) => {
        setGenre(set)
        setPage(1)
    }

    const handleWhichGenre = (set) => {
        setWhich(set)
        setGenre('')
        setPage(1)
    }

    const handlePage = (data) => {
        if (data == true) {
            handleScroll()
            setPage(page + 1)
            return
          }
          else {
            if (page > 1) {
              handleScroll()
              setPage(page - 1)
              return
            }
        }
    }

    return (
            <div>
                <GlobalStyle/>
                <Navbar color1={activatedColor} token={token}/>
                <HomepageBody>
                    <Filters>
                        <InputSearch1 placeholder={'Search'} onChange={setSearch}/>
                        <Dropdown1 placeholder={'Type'} items={[['Movies', 'movie'], ['TV', 'tv'] ]} onTypeChange={handleWhichGenre}/>
                        <Dropdown1 placeholder={'Genre'} items={allGenres} onTypeChange={handleGenreChange}/>
                    </Filters>
                    <Content>
                        <TmdbContent media_type={which} genre={genre} page={page} search={search} onClick={handleContentClick}/>
                    </Content>
                    <Footer onSaveData={handlePage} page={page}/>
                </HomepageBody>
                <DataBox showBoxState={showBox} onClose={handleCloseBox} contentId={contentId} type={which} token={token}/>
            </div>
    )
}

export default Homepage;

const HomepageBody = styled.div`
    position: relative;
    width: 100vw;
`;

const Filters = styled.div`
    margin-left: 5%;
    padding-top: 80px;
    flex-direction: column;
    width: fit-content;
`;

const Content = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
`;

const GlobalStyle = createGlobalStyle`
    body {
        overflow-x: hidden;
    };
`;