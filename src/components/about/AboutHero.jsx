import React from "react";

const AboutHero = () => {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">

        {/* BACKGROUND IMAGE - Use a generic quality image or placeholder if hero-bg.jpg is missing */}
        <div className="absolute inset-0 bg-slate-900">
             <img
              src="/hero_background_image.webp"
              alt="About Smart ePrint Solution"
              className="w-full h-full object-cover opacity-40"
            />
        </div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-12 py-16 sm:py-20 md:py-28">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white uppercase tracking-tighter">
            About Smart ePrint Solution
          </h1>

          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl font-medium">
            Welcome to Smart ePrint Solution — your trusted online destination for printers, inks, toners, and printing accessories across the United States and Canada. We're dedicated to making printing simple, reliable, and affordable through a seamless online shopping experience backed by expert customer support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
