// src/components/Carousel.tsx
import React from "react";
import Slider from "react-slick";
import "../styles/Carousel.css"

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img
            src="https://digitaldeleon.com/wp-content/uploads/2023/02/Fotos-1200x675-2023-02-09T093453.427.jpg"
            alt="Pizza 1"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="https://digitaldeleon.com/wp-content/uploads/2025/02/Copia-de-Fotos-1200x675-2025-02-06T121209.605.webp"
            alt="Pizza 2"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="https://theobjective.com/wp-content/uploads/2016/08/Francescos-Pizza-Madrid-1200x675.jpg"
            alt="Pizza 3"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="https://www.elbierzodigital.com/wp-content/uploads/2023/06/pizzeria-Mamma-Mia-de-Camponaraya-15-1200x675.jpeg"
            alt="Pizza 4"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="https://moye.es/wp-content/uploads/2023/03/pizza-napoletana-forno-a-legna-1200x675-min-1024x576-1.webp"
            alt="Pizza 5"
            className="carousel-image"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
