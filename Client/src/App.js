import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AgroTrucker from './AgroTrucker.jfif';
import AgroTrucker2 from './AgroTrucker2.jfif';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

function App() {
  const slides = [AgroTrucker2,AgroTrucker];
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div>
      <Navbar />
      <div className='relative'>
        <div style={{ top: '10px', left: '2000px' }}>
          <h1 className='absolute left-[3%] top-[10%] text-white text-4xl'>
            Welcome<br />to <b>AgroChain!</b>
          </h1>
          <h2 className='absolute top-[26.5%] left-[3%] text-white text-1xl'>
            Smart Fruit Health Monitoring<br/>and Tracking System
          </h2>

          <button class="absolute bg-blue text-white-800 font-semibold py-2 px-4 border border-blue-400 rounded-none absolute left-[3%] top-[40%] text-white shawdow hover:bg-white-700 ">Get Started</button>
        </div>

          <div className='absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} />
          </div>
          <div className='absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} />
          </div>
        <img
          className='w-screen h-screen object-cover top-16'
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
        />
      </div>
    </div>
  );
}

export default App;
