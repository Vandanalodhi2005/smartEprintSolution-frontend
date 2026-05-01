import React from "react";

const WhatWeOffer = () => {
  return (
    <section className="w-full bg-white py-10 bg-[#f6eced]">
      <div className="relative flex min-h-[500px] md:min-h-[620px]">
        {/* Left Side - Image (~75%) */}
        <div className="w-full sm:w-[75%] relative">
          <img
            src="/what-we-offer.jpg"
            alt="Printer with ink cartridges"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Right Side - Pink area (~25%) */}
        <div className="hidden sm:block sm:w-[25%] bg-[#f6eced]"></div>

        {/* Floating Card - mostly over image, more space on right */}
        <div className="absolute sm:right-[12%] lg:right-[15%] top-1/2 -translate-y-1/2 z-10 mx-4 sm:mx-0 sm:w-[35%] lg:w-[28%]">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-6">
              What We Offer
            </h2>
            <ul className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed list-disc pl-5">
              <li>A wide range of printers, cartridges, and accessories from leading brands — all in one convenient place.</li>
              <li>Competitive pricing and regular offers that help you save more while getting premium quality.</li>
              <li>Fast, reliable shipping throughout the U.S. and Canada.</li>
              <li>A dedicated support team ready to assist with product questions, order updates, and setup guidance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
