import React from "react";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();

  const handleViewCollection = () => {
    navigate("/shop");
  };

  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <img
          src="/hero_background_image.webp"
          alt="Smart ePrint Solution background"
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gray-950/70"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-12 py-16 sm:py-20 md:py-28">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
            Smarter Printing Starts<br />Here
          </h1>

          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            Discover a smarter way to print with Smart ePrint Solution. Shop genuine printers, inks, and accessories from trusted brands — all at unbeatable prices. Enjoy fast, reliable delivery, secure checkout, and expert customer support whenever you need it. Print with confidence, save more, and experience seamless performance every time.
          </p>

          <button
            onClick={handleViewCollection}
            className="bg-[#EF4056] text-white px-8 py-3 rounded-full font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-[#d93548] transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Explore The Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
