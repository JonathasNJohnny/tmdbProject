import React, { useState } from 'react';

const BetterImg = ({ src, alt, loadingSrc }) => {
    const [loading, setLoading] = useState(true);

    const handleImageLoaded = () => {
        setLoading(false);
    };

    return (
        <div>
        {loading && <img src={loadingSrc} alt="Carregando..." width={500} />}
        <img
            src={src}
            alt={alt}
            onLoad={handleImageLoaded}
            style={{ display: loading ? 'none' : 'block' }}
        />
        </div>
    );
};

export default BetterImg;