import React from "react";
import { Link } from "react-router-dom";

const PrintingDestination = () => {
  return (
    <section className="w-full bg-white">
      <div className="relative flex min-h-[500px] md:min-h-[620px]">
        {/* Left Side - Image (~75%) */}
        <div className="w-full sm:w-[75%] relative">
          <img
            src="/bg-image-home.jpg"
            alt="Team working together"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Right Side - White area (~25%) */}
        <div className="hidden sm:block sm:w-[25%] bg-[#f6eced]"></div>

        {/* Floating Card - mostly over image, more space on right */}
        <div className="absolute sm:right-[12%] lg:right-[15%] top-1/2 -translate-y-1/2 z-10 mx-4 sm:mx-0 sm:w-[35%] lg:w-[28%]">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-4">
              Your All-in-One Printing Destination
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              At Smart ePrint, we make printing simple, smart, and affordable. Discover high-quality printers, genuine inks, and reliable accessories — all backed by expert support to meet your home, office, and business needs in one place.
            </p>
            <Link
              to="/about"
              className="inline-block bg-[#EF4056] text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#d93548] transition-all duration-300 shadow-md"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrintingDestination;
