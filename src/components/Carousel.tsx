import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "../styles/Carousel.css";

const slides = [
  {
    img: "https://digitaldeleon.com/wp-content/uploads/2023/02/Fotos-1200x675-2023-02-09T093453.427.jpg",
    text: "Domina la pizza",
  },
  {
    img: "https://digitaldeleon.com/wp-content/uploads/2025/02/Copia-de-Fotos-1200x675-2025-02-06T121209.605.webp",
    text: "Hamburguesas brutales",
  },
  {
    img: "https://theobjective.com/wp-content/uploads/2016/08/Francescos-Pizza-Madrid-1200x675.jpg",
    text: "Sabor auténtico italiano",
  },
  {
    img: "https://www.elbierzodigital.com/wp-content/uploads/2023/06/pizzeria-Mamma-Mia-de-Camponaraya-15-1200x675.jpeg",
    text: "Recetas que enganchan",
  },
  {
    img: "https://moye.es/wp-content/uploads/2023/03/pizza-napoletana-forno-a-legna-1200x675-min-1024x576-1.webp",
    text: "Hecho al momento",
  },
];

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
  }, []);

  return (
    <div className="carousel-wrapper">

      {/* CTA ANIMADO */}
      <div key={animKey} className="carousel-cta animate">
        <h2>{slides[activeIndex].text}</h2>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          setAnimKey((prev) => prev + 1); // fuerza re-animación
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide">
              <img src={slide.img} alt="" />
              <div className="overlay" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default Carousel;