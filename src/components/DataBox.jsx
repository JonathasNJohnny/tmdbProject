import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { Icon } from '@iconify/react/dist/iconify.js';
import Dropdown1 from './Dropdown1';

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
                    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${contentId}?api_key=72685f398b32e9d77e422b1b37d21421`);
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

    const handleRatingChange = (value) => {
        setRating(value);
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
            toast.done('')
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
                                        <Dropdown1
                                            placeholder="Rate this content: "
                                            items={[
                                                [0, 0],
                                                [1, 1],
                                                [2, 2],
                                                [3, 3],
                                                [4, 4],
                                                [5, 5]
                                            ]}
                                            onTypeChange={handleRatingChange}
                                        />
                                        <StyledButton onClick={handleSubmitRating} style={{marginTop: '20px'}}>Send</StyledButton>
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
    max-width: 80%; /* Defina um tamanho máximo para a largura da caixa */
    @media (max-width: 768px) {
        max-height: 50%; /* Defina um tamanho máximo para a altura da caixa em telas menores */
        overflow-y: auto; /* Ative a barra de rolagem vertical se o conteúdo exceder a altura máxima */
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
    @media (max-width: 768px) {
        max-height: 345px;
        overflow-y: auto;
        overflow-x: hidden;
    }
`;

const Description = styled.p`
    font-size: 16px;
    margin-bottom: 5px;
    @media (max-width: 768px) {
        max-height: 300px;
        overflow-y: auto;
        overflow-x: hidden;
        font-size: 15px;
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
    background-color: #00000089;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

const StyledButton = styled.button`
    padding-top: 13px;
    padding-bottom: 13px;
    background-color: #494f55;
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
`