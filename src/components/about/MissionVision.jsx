import React from "react";

const MissionVision = () => {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            At Smart ePrint, everything we do revolves around you — your printing needs,
            <br className="hidden sm:block" />
            your workspace, and your desire for quality, reliability, and value.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Our Mission Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-12 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 bg-[#EF4056] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              At Smart ePrint, our mission is to make printing simple, reliable, and affordable for everyone. We're here to help homes, students, and businesses across the United States and Canada find the right printers and accessories — with genuine products, fair prices, and friendly support every step of the way.
            </p>
          </div>

          {/* Our Vision Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-12 text-center md:mt-12">
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 bg-[#EF4056] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Our vision is to be the most trusted online destination for printing solutions in North America. We aim to create a place where customers can shop with confidence, enjoy a smooth experience, and always feel supported — because at Smart ePrint, your printing needs come first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
