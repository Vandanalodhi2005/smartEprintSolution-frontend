import React from "react";

const WhatWeOffer = () => {
  return (
    <section className="w-full py-10 bg-[#f6eced]">
      <div className="relative flex min-h-[500px] md:min-h-[620px]">
        {/* Left Side - Image (~75%) */}
        <div className="w-full sm:w-[75%] relative overflow-hidden rounded-r-[3rem]">
          <img
            src="/hero_background_image.webp"
            alt="Printer with ink cartridges"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>

        {/* Right Side - Space area (~25%) */}
        <div className="hidden sm:block sm:w-[25%] bg-[#f6eced]"></div>

        {/* Floating Card */}
        <div className="absolute sm:right-[12%] lg:right-[15%] top-1/2 -translate-y-1/2 z-10 mx-4 sm:mx-0 sm:w-[35%] lg:w-[30%]">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-gray-100 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-8 uppercase tracking-tight">
              What We Offer
            </h2>
            <ul className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
              <li className="flex gap-3">
                <span className="text-[#EF4056] font-bold">•</span>
                <span>A wide range of printers, cartridges, and accessories from leading brands — all in one convenient place.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#EF4056] font-bold">•</span>
                <span>Competitive pricing and regular offers that help you save more while getting premium quality.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#EF4056] font-bold">•</span>
                <span>Fast, reliable shipping throughout the U.S. and Canada.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#EF4056] font-bold">•</span>
                <span>A dedicated support team ready to assist with product questions, order updates, and setup guidance.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
