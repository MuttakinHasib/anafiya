import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const slides = [
  {
    offer: "30% off",
    title: "Elegant Timepieces and Accessories",
    description:
      "Discover our exquisite collection of handcrafted watches and accessories, designed to elevate your style.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    link: "/shop",
  },
  {
    offer: "25% off",
    title: "Tick & Glow's Timeless Elegance",
    description:
      "Elevate your surroundings with the timeless elegance of our wall clocks, each tick matched with the warm glow of our stylish lamps.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88",
    link: "/shop",
  },
];

export const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="pb-8">
      <div className="container">
        <Slider {...settings} afterChange={setCurrentSlide}>
          {slides.map((slide, index) => (
            <React.Fragment key={index}>
              <div
                className={`bg-no-repeat bg-cover bg-center w-full cursor-pointer`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="pt-9 px-10 pb-10 lg:p-14 xl:py-16 xl:px-20 xxl:px-24 xxl:py-20 space-y-10 w-full">
                  <div className="space-y-5">
                    {slide.offer && (
                      <span
                        className={clsx(
                          "font-bold uppercase text-xl sm:text-2xl md:text-4xl bg-yellow-300 py-1 px-2 inline-block opacity-0",
                          currentSlide === index &&
                            "animate__fadeInLeft animate__animated"
                        )}
                      >
                        {slide.offer}
                      </span>
                    )}
                    <h5
                      className={clsx(
                        "font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl max-w-md w-full opacity-0 bg-white md:bg-transparent p-2 md:p-0",
                        currentSlide === index &&
                          "animate__animated animate__bounceIn opacity-100"
                      )}
                    >
                      {slide.title}
                    </h5>
                    <p
                      className={clsx(
                        "font-normal md:text-lg text-gray-500 max-w-sm w-full opacity-0 hidden md:block",
                        currentSlide === index &&
                          "animate__fadeInUp animate__animated"
                      )}
                    >
                      {slide.description}
                    </p>
                  </div>
                  <Link
                    className={clsx(
                      "inline-block bg-yellow-500 py-2 md:py-3 text-sm md:text-lg font-medium px-6 md:px-10 transition-colors duration-300 hover:bg-gray-700 text-white opacity-0",
                      currentSlide === index &&
                        "animate__fadeIn animate__animated"
                    )}
                    to={slide.link}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </React.Fragment>
          ))}
        </Slider>
      </div>
    </div>
  );
};
