import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "../styles/Carousel.css";

const Carousel: React.FC = () => {
  useEffect(() => {
    console.log("[PizzeriaIA] Carousel montado");
  }, []);

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img
            src="https://digitaldeleon.com/wp-content/uploads/2023/02/Fotos-1200x675-2023-02-09T093453.427.jpg"
            alt="Pizza 1"
            className="carousel-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://digitaldeleon.com/wp-content/uploads/2025/02/Copia-de-Fotos-1200x675-2025-02-06T121209.605.webp"
            alt="Pizza 2"
            className="carousel-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://theobjective.com/wp-content/uploads/2016/08/Francescos-Pizza-Madrid-1200x675.jpg"
            alt="Pizza 3"
            className="carousel-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://www.elbierzodigital.com/wp-content/uploads/2023/06/pizzeria-Mamma-Mia-de-Camponaraya-15-1200x675.jpeg"
            alt="Pizza 4"
            className="carousel-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://moye.es/wp-content/uploads/2023/03/pizza-napoletana-forno-a-legna-1200x675-min-1024x576-1.webp"
            alt="Pizza 5"
            className="carousel-image"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;