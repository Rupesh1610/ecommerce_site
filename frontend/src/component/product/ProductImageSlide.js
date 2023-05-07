import React, { Fragment, useRef } from "react";
import "./productImgSlide.css";

const ProductImageSlide = ({ image }) => {
  let counter = 0;

  const slides = useRef([]);

  const addToRef = (el) => {
    slides.current.push(el);
  };

  const slideImage = () => {
    slides.current.forEach((item) => {
      item.style.transform = `translateX(-${counter * 100}%)`;
    });
  };

  const handlePrev = () => {
    counter--;
    slideImage();
  };

  const handleNext = () => {
    if (counter < image.length - 1) {
      counter++;
      slideImage();
    }
  };
  return (
    <Fragment>
      {image &&
        image.map((item, i) => (
          <img
            style={{ left: `${i * 100}%` }}
            className="slides"
            ref={addToRef}
            src={item.url}
            key={item.url}
            alt={`${i} Slide`}
          />
        ))}
      <div>
        <button className="prev_btn" onClick={handlePrev}>
          &#10094;
        </button>
        <button className="next_btn" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </Fragment>
  );
};

export default ProductImageSlide;
