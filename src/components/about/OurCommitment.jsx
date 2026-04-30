import React from "react";

const OurCommitment = () => {
  return (
    <section className="w-full bg-white">
      <div className="relative flex min-h-[500px] md:min-h-[620px]">
        {/* Left Side - Black background (~50%) */}
        <div className="w-full sm:w-[50%] bg-slate-900 flex items-center">
          <div className="px-10 sm:px-16 lg:px-20 py-12 max-w-lg mx-auto text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5 uppercase tracking-tighter">
              Our Commitment
            </h2>
            <div className="h-1 w-20 bg-[#EF4056] rounded-full mb-8"></div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              We believe that great printing shouldn't be complicated.
              <br />
              Our promise is to deliver:
            </p>
            <ul className="space-y-4 text-white text-sm sm:text-base font-bold">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#EF4056] rounded-full"></div>
                Genuine, high-quality products
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#EF4056] rounded-full"></div>
                Clear and accurate product information
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#EF4056] rounded-full"></div>
                Dependable customer support
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#EF4056] rounded-full"></div>
                A safe, transparent, and satisfying experience
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Image (~50%) */}
        <div className="hidden sm:block sm:w-[50%] relative overflow-hidden">
          <img
            src="/hero_background_image.webp"
            alt="Team working together"
            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900/50"></div>
        </div>
      </div>
    </section>
  );
};

export default OurCommitment;
