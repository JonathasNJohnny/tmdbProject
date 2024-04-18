import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from 'styled-components';
import axios from 'axios';
import { Icon } from '@iconify/react/dist/iconify.js';

export const DataBox = ({ contentId = '1011985', type = 'movie', showBoxState = false, onClose }) => {
    const [content, setContent] = useState(null);
    const [showBox, setShowBox] = useState(false);
    const [rating, setRating] = useState(0);
    const API_KEY = '72685f398b32e9d77e422b1b37d21421';

    useEffect(() => {
        setShowBox(showBoxState);

        const fetchContent = async () => {
            if (showBox) {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${contentId}?api_key=${API_KEY}`);
                    const contentData = {
                        img: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
                        title: response.data.title || response.data.name,
                        description: response.data.overview,
                        rating: Math.round(response.data.vote_average * 10) / 10
                    };
                    setContent(contentData);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchContent();
    }, [contentId, showBox, type, showBoxState]);

    const handleCloseBox = () => {
        setShowBox(false);
        onClose(false);
    };

    const handleRatingChange = (event) => {
        setRating(Number(event.target.value));
    };

    const handleSubmitRating = async () => {
        try {
            const guestSessionResponse = await axios.post(
                `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`
            );
    
            const guestSessionId = guestSessionResponse.data.guest_session_id;
    
            await axios.post(
                `https://api.themoviedb.org/3/${type}/${contentId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
                {
                    value: rating
                }
            );
            console.log('rated!');
            toast.success('Rated Successfully')
            handleCloseBox()
        } catch (error) {
            console.error('rating : error:', error);
        }
    };

    return (
        <div>
            <ToastContainer />
            {showBox && (
                <>
                    <DataNet onClick={handleCloseBox} />
                    <Box className={'bg-dark'}>
                        <CloseButton onClick={handleCloseBox}><Icon icon='mdi:close' color='#f0ffff94' fontSize={'30px'} /></CloseButton>
                        {content && (
                            <>
                                <ContentContainer>
                                    <Image src={content.img} alt={content.title} />
                                    <DescriptionContainer>
                                        <Title>{content.title}</Title>
                                        <Rating>{content.rating}/10</Rating>
                                        <Description>{content.description}</Description>
                                        <RatingForm>
                                            <label htmlFor="rating">Avalie este filme:</label>
                                            <StyledSelect id="rating" value={rating} onChange={handleRatingChange}>
                                                <option value={0}>0</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </StyledSelect>
                                            <StyledButton onClick={handleSubmitRating}>Enviar</StyledButton>
                                        </RatingForm>
                                    </DescriptionContainer>
                                </ContentContainer>
                            </>
                        )}
                    </Box>
                </>
            )}
        </div>
    );
};

export default DataBox;

const Box = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: #f0ffff;

    @media (max-width: 768px) {
        padding-top: 55px;
        padding-bottom: 55px;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    width: 150px;
    height: auto;
    margin-right: 20px;
    border: 2px solid #0f1316;
`;

const Title = styled.h2`
    font-size: 20px;
    margin-bottom: 5px;
`;

const Rating = styled.p`
    font-size: 16px;
    margin-bottom: 5px;
`;

const DescriptionContainer = styled.div`
    overflow-y: auto; /* Adiciona rolagem vertical */
    max-height: 300px; /* Define uma altura máxima para a descrição */
`;

const Description = styled.p`
    font-size: 16px;
`;

const RatingForm = styled.div`
    margin-top: 20px;

    label {
        margin-right: 10px;
    }

    select {
        margin-right: 10px;
        width: 80px;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
`;

const DataNet = styled.div`
    position: fixed;
    background-color: #00000065;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

const StyledButton = styled.button`
    margin-top: 20px;
    background-color: #4b5258;

`
const StyledSelect = styled.select`
    background-color: #4b5258;
    outline: none;
    border-radius: 5%;
    padding: 5px;

`