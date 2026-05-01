import React from "react";

const Reviews = () => {
  const reviews = [
    {
      name: "Emily Rodriguez",
      quote: "It's hard to find genuine printer supplies online, but Smart ePrint delivers every time. Great service and smooth shopping experience.",
    },
    {
      name: "Michael Davis",
      quote: "I wasn't sure which printer suited my home office, but the support team guided me perfectly. Very happy with my purchase and the overall experience.",
    },
    {
      name: "Olivia Martin",
      quote: "The quality, pricing, and service are all top-notch. I've already recommended Smart ePrint to my colleagues and friends!",
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            What Our<br />Customers Say
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Real Experiences. Reliable Printing. Real Satisfaction.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#f8e8e8] rounded-2xl p-8 flex flex-col justify-between min-h-[300px]"
            >
              {/* Quote Icon */}
              <div>
                <svg className="w-10 h-10 text-[#EF4056] mb-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {review.quote}
                </p>
              </div>

              {/* Avatar + Name */}
              <div className="flex items-center gap-3 mt-6">
                <div className="w-11 h-11 rounded-full bg-white border-2 border-[#EF4056] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#EF4056]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <span className="font-bold text-gray-900 text-sm">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
