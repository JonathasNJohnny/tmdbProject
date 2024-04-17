import React, { useEffect, useState} from 'react'
import axios from 'axios';
import BetterImg from './BetterImg';
import altImg from '../assets/altImg.jpg'
import styled from 'styled-components';

const API_KEY = '72685f398b32e9d77e422b1b37d21421';
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=`;

export const TmdbContent = (media_type = 'movie', genre = '', required = '', page) => {
    const [movies, setMovies] = useState([]);

    const handleClick = (movieId) => {
        console.log(movieId);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(API_URL);
                setMovies(response.data.results);
                } 
            catch (error) {
                console.error('Erro ao buscar filmes:', error);
            }
        };
    
        fetchMovies();
        }, []);

    return (
        <ContentBody>
            {movies.map((movie) => (
                <Card key={movie.id} onClick={() => handleClick(movie.id)}>
                <BetterImg
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    loadingSrc={altImg}
                />
                <h2>{movie.title}</h2>
                </Card>
            ))}
        </ContentBody>
    );
};

export default TmdbContent;

const ContentBody = styled.div`
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(238px, 1fr)); 
    gap: 45px;
    margin: 40px 10% 0 10%;
    width: auto;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 15px;
        margin: 5px 5% 0 5%;
    }
`
const Card = styled.div`
    border-radius: 10px;
    text-align: center;
    cursor: pointer;

    img {
        width: 100%;
        border: 5px solid #181220;
        border-radius: 5px;
    }

    h2 {
        font-size: 18px;
        margin-bottom: 5px;
        color: #d3d3d3;
        margin-top: 10px;
    }
`