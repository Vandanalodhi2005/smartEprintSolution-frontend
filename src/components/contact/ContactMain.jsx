import React from 'react';
import ContactForm from './ContactForm';
import SEO from '../common/SEO';

const ContactMain = () => {
  return (
    <>
    <section className="w-full bg-[#f6eced] py-16 sm:py-20 lg:py-24 mb-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-2">
          Need assistance with your order, product information, or delivery?
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          Our dedicated Smart ePrint team is ready to help. Get in touch — we’re here to make your printing journey simple and stress-free.
        </p>
      </div>
    </section>

    <section className="w-full bg-gray-50">
      <SEO
          title="Contact Us"
          description="Get in touch with PrintsBasket. We're here to help with your printer and printing supply needs. Email, phone, or send us a message."
          canonical="/contact-us"
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Contact Form */}
          <div className="bg-[#f6eced] rounded-3xl p-8 sm:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us Message</h2>
            <ContactForm />
          </div>
          {/* Right: Contact Info */}
          <div className="bg-[#f6eced] rounded-3xl p-8 sm:p-12 flex flex-col justify-center">
            <div className="space-y-10">
              <div className="flex items-start gap-5">
                <span className="bg-white rounded-full p-4 shadow text-[#EF4056]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2V8.5M17 8.5V6a5 5 0 00-10 0v2.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5l9 6 9-6" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-700">support@smarteprint.com</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className="bg-white rounded-full p-4 shadow text-[#EF4056]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 0v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-700">+1-651-815-4630</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className="bg-white rounded-full p-4 shadow text-[#EF4056]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657A8 8 0 013.343 2.343a8 8 0 0111.314 11.314z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-700">11397 Quincy St NE Blaine, Minnesota, 55434</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className="bg-white rounded-full p-4 shadow text-[#EF4056]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm0-8a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Website</h3>
                  <p className="text-gray-700">www.smarteprint.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactMain;
