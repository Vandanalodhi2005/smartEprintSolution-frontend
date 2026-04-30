import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Browse & Choose",
      description: "Find the perfect printer, ink, or accessory for your needs.",
      icon: (
        <svg className="w-6 h-6 text-[#EF4056]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
        </svg>
      ),
    },
    {
      title: "Order Securely",
      description: "Quick checkout with safe and flexible payment options.",
      icon: (
        <svg className="w-6 h-6 text-[#EF4056]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      ),
    },
    {
      title: "Get Fast Delivery",
      description: "Sit back and relax while we deliver right to your door.",
      icon: (
        <svg className="w-6 h-6 text-[#EF4056]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#f8e8e8] py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Just Choose, Order & Print with Ease
          </p>
        </div>

        {/* Steps Card */}
        <div className="bg-white rounded-2xl px-6 sm:px-10 py-8 sm:py-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 px-4 sm:px-6 py-6 md:py-0">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full border-2 border-[#EF4056] flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                {/* Text */}
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
