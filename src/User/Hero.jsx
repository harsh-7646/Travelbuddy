import React, { useEffect, useState } from 'react';
import './Hero.css';

const images = [
  'https://imageio.forbes.com/specials-images/dam/imageserve/1171238184/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds',
  'https://themewagon.github.io/pacific/images/bg_5.jpg',
  'https://themewagon.github.io/pacific/images/bg_1.jpg',
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => setCurrentImageIndex(index);

  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="hero-content">
        <h1>Explore the Beauty<br />of the Beautiful<br />World</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />
          Soluta veritatis in tenetur doloremque, maiores doloribus.<br />
        </p>
      </div>

      <div className="hero-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${currentImageIndex === idx ? 'active' : ''}`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
