import React from "react";
import FAQContent from "./FAQContent";
import SEO from '../common/SEO';
import Newsletter from '../home/Newsletter';

const FAQMain = () => {
  return (
    <div className="bg-white">
      <SEO
          title="FAQ | Smart ePrint Solution"
          description="Frequently asked questions about Smart ePrint Solution printers, shipping, and returns."
          canonical="/faq"
      />
      
      {/* Hero Section */}
      <section className="w-full bg-slate-900 py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#EF4056] via-transparent to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-[#EF4056] text-[10px] font-black uppercase tracking-[0.4em] mb-4">Support Intelligence</p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
            How can we<br/><span className="text-slate-600">Assist You?</span>
          </h1>
          <p className="text-slate-400 font-medium text-lg max-w-xl mx-auto leading-relaxed">
            Access our comprehensive knowledge base for hardware specifications, deployment protocols, and logistics guidance.
          </p>
        </div>
      </section>

      <div className="py-24">
        <FAQContent />
      </div>

      <Newsletter bg="bg-slate-50"/>
    </div>
  );
};

export default FAQMain;
