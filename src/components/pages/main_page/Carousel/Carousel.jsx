import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./style.scss";

const Carousel = () => {

    const windowWidth = useRef(window.innerWidth);
    const [sliderNumber, setSliderNumber] = useState();

    useEffect(() => {
      if (windowWidth.current > 999) {
        setSliderNumber(3)
      } else if (windowWidth.current > 649) {
        setSliderNumber(2)
      } else {
        setSliderNumber(1)
      }
    },[])

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: sliderNumber,
      slidesToScroll: 1,
    };

      return (
        <Slider {...settings} className="first_slider">
          <div className="slide">
            <img src="/img/slick_icon_first.svg"/>
            <p className="slider_text">
              Высокая и оперативная скорость обработки заявки
            </p>
          </div>
          <div className="slide">
            <img src="/img/slick_icon_second.svg"/>
            <p className="slider_text">
              Огромная комплексная база данных, обеспечивающая объективный ответ на запрос
            </p>
          </div>
          <div className="slide">
            <img src="/img/slick_icon_third.svg"/>
            <p className="slider_text">
              Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству
            </p>
          </div>
          <div className="slide">
            <img src="/img/slick_icon_first.svg"/>
            <p className="slider_text">
              Высокая и оперативная скорость обработки заявки
            </p>
          </div>
          <div className="slide">
            <img src="/img/slick_icon_second.svg"/>
            <p className="slider_text">
              Огромная комплексная база данных, обеспечивающая объективный ответ на запрос
            </p>
          </div>
          <div className="slide">
            <img src="/img/slick_icon_third.svg"/>
            <p className="slider_text">
              Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству
            </p>
          </div>
        </Slider>
      );
}
export default Carousel;