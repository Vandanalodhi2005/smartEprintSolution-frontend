import React from "react";

const OurCommitment = () => {
  return (
    <section className="w-full bg-white">
      <div className="relative flex min-h-[500px] md:min-h-[620px]">
        {/* Left Side - Black background (~50%) */}
        <div className="w-full sm:w-[50%] bg-black flex items-center">
          <div className="px-10 sm:px-16 lg:px-20 py-12 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-5">
              Our Commitment
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              We believe that great printing shouldn't be complicated.
              <br />
              Our promise is to deliver:
            </p>
            <ul className="space-y-3 text-white text-sm sm:text-base font-semibold list-disc pl-5">
              <li>Genuine, high-quality products</li>
              <li>Clear and accurate product information</li>
              <li>Dependable customer support</li>
              <li>A safe, transparent, and satisfying shopping experience</li>
            </ul>
          </div>
        </div>

        {/* Right Side - Image (~50%) */}
        <div className="hidden sm:block sm:w-[50%] relative">
          <img
            src="/bg-image-home.jpg"
            alt="Team working together"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default OurCommitment;
