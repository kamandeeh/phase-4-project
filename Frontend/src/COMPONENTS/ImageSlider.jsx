import React, { useState } from 'react';

function ImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvJlZu3Q0DsDhUJveU5OGRrIPNVqzqpl3dlA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasm5yPEArerwBdy0RI6wa-GKYn9m2lC5T1w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNZsP91oPUiX-IXWMLyJE67tESyY-IQuafg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2G68sGjuGWB0ObzgdjD4Ox_170WEcp-rvbA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLObpXFrDuQAanIpl2jW_og6H_wLId1Mbbw&s",
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div id="indicators-carousel" className="relative w-full">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === activeIndex ? 'block' : 'hidden'
            } duration-700 ease-in-out`}
          >
            <img
              src={image}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? 'bg-blue-500' : 'bg-white'
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default ImageSlider;
