import React, { useEffect, useState} from 'react'
import axios from 'axios';
import BetterImg from './BetterImg';
import altImg from '../assets/altImg.jpg'
import styled from 'styled-components';

const API_KEY = '72685f398b32e9d77e422b1b37d21421';
let API_URL = ''

export const TmdbContent = ({ media_type = 'movie', genre = '', search = '', page = '1', onClick }) => {
    const [movies, setMovies] = useState([]);
    const handleClick = (movieId) => {
        onClick(movieId)
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (search) {
                    API_URL = `https://api.themoviedb.org/3/search/${media_type}?api_key=${API_KEY}&query=${search}`;
                } else {
                    API_URL = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre}`
                }

                const response = await axios.get(API_URL);
                if (response.data.results.length === 0 && search) {
                    const defaultUrl = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre}`;
                    const defaultResponse = await axios.get(defaultUrl);
                    setMovies(defaultResponse.data.results);
                } else {
                    setMovies(response.data.results);
                }
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
            }
        };

        fetchMovies();
    }, [media_type, genre, page, search]);

    return (
        <ContentBody>
            {movies.map((movie) => (
                <Card key={movie.id} onClick={() => handleClick(movie.id)}>
                    <BetterImg
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        loadingSrc={altImg}
                    />
                    <h2>{movie.name}{movie.title}</h2>
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
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
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
        border: 5px solid #0f1316;
        border-radius: 5px;
    }

    h2 {
        font-size: 18px;
        margin-bottom: 5px;
        color: #d3d3d3;
        margin-top: 10px;
    }
`