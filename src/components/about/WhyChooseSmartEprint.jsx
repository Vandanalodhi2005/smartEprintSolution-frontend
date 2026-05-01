import React from "react";

const WhyChooseSmartEprint = () => {
  const features = [
    {
      title: "Authenticity You Can Rely On",
      description: "We provide only genuine printers and accessories from trusted global brands. Every product meets strict quality standards to ensure long-lasting performance and dependable results.",
      icon: (
        <svg className="w-14 h-14 text-[#EF4056]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm2-4v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" />
          <circle cx="18" cy="11.5" r="1" />
        </svg>
      ),
    },
    {
      title: "Value That Makes Sense",
      description: "Shop with confidence knowing you're getting premium printers and supplies at honest prices. We combine affordability with quality — so you never have to compromise.",
      icon: (
        <svg className="w-14 h-14 text-[#EF4056]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          <text x="7.5" y="12.5" fontSize="7" fontWeight="bold" fill="currentColor">$</text>
        </svg>
      ),
    },
    {
      title: "Your Satisfaction, Our Priority",
      description: "We believe in building trust through service. That's why every purchase is backed by a 100% satisfaction guarantee and a team dedicated to your complete peace of mind.",
      icon: (
        <svg className="w-14 h-14 text-[#EF4056]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      ),
    },
    {
      title: "Support That Never Sleeps",
      description: "From setup to troubleshooting, our 24/7 expert support team is always available to assist you — ensuring your printing experience remains smooth, efficient, and stress-free.",
      icon: (
        <svg className="w-14 h-14 text-[#EF4056]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Why Choose Smart ePrint?
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Trusted Printing Solutions — Where Quality Meets Affordability
          </p>
        </div>

        {/* Feature Cards - staggered layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow duration-300 ${
                index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-12'
              }`}
            >
              <div className="flex justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSmartEprint;
