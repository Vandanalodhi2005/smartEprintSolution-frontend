import React from 'react';
import ContactForm from './ContactForm';
import SEO from '../common/SEO';

const ContactMain = () => {
  return (
    <>
    <section className="w-full bg-[#f6eced] py-16 sm:py-20 lg:py-24 mb-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
          Contact Us
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-2 font-medium">
          Need assistance with your order, product information, or delivery?
        </p>
        <p className="text-gray-700 text-base sm:text-lg font-medium">
          Our dedicated Smart ePrint Solution team is ready to help. Get in touch — we’re here to make your experience simple and stress-free.
        </p>
      </div>
    </section>

    <section className="w-full bg-white">
      <SEO
          title="Contact Us"
          description="Get in touch with Smart ePrint Solution. We're here to help with your printer and printing supply needs. Email, phone, or send us a message."
          canonical="/contact-us"
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Contact Form */}
          <div className="bg-[#f6eced] rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-center shadow-inner">
            <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight text-left">Send Us Message</h2>
            <ContactForm />
          </div>
          {/* Right: Contact Info */}
          <div className="bg-[#f6eced] rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-center shadow-inner">
            <div className="space-y-10 text-left">
              <div className="flex items-start gap-5">
                <span className="bg-white rounded-2xl p-4 shadow-lg text-[#EF4056]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-1">Email</h3>
                  <p className="text-gray-900 font-bold text-lg">support@smarteprintsolution.com</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className="bg-white rounded-2xl p-4 shadow-lg text-[#EF4056]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-1">Phone</h3>
                  <p className="text-gray-900 font-bold text-lg">+1-651-815-4630</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className="bg-white rounded-2xl p-4 shadow-lg text-[#EF4056]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-1">Address</h3>
                  <p className="text-gray-900 font-bold text-lg">11397 Quincy St NE Blaine, MN 55434</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className="bg-white rounded-2xl p-4 shadow-lg text-[#EF4056]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-1">Website</h3>
                  <p className="text-gray-900 font-bold text-lg">www.smarteprintsolution.com</p>
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
