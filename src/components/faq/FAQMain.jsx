import React from "react";
import FAQContent from "./FAQContent";
import SEO from '../common/SEO';
import Newsletter from '../home/Newsletter';

const FAQMain = () => {
  return (
    <>
      <SEO
          title="FAQ"
          description="Frequently asked questions about Smart ePrint printers, shipping, returns, and more. Find answers to common queries."
          canonical="/faq"
      />
      {/* Hero Section */}
      <section className="w-full bg-[#f6eced] py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Explore our most commonly asked questions below.
          </p>
        </div>
      </section>
      <FAQContent />
      <Newsletter bg="bg-[#f6eced]"/>
    </>
  );
};

export default FAQMain;
