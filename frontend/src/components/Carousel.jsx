import React, { useState, useEffect } from 'react';
import { carouselImages } from '../images/index.js';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: carouselImages.enduro,
      title: 'Moto Enduro',
      description: 'Aventura y resistencia en cualquier terreno',
    },
    {
      image: carouselImages.deportiva,
      title: 'Moto Deportiva',
      description: 'Velocidad y adrenalina en la carretera',
    },
    {
      image: carouselImages.scooter,
      title: 'Moto Scooter',
      description: 'Practicidad y comodidad en la ciudad',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden rounded-lg shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Imagen de fondo */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          
          {/* Contenido */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-5xl font-bold mb-2">{slide.title}</h2>
            <p className="text-2xl">{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Controles */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white px-4 py-2 rounded transition z-10"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white px-4 py-2 rounded transition z-10"
      >
        ❯
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
