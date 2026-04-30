import React from "react";
import SEO from '../common/SEO';

const Disclaimer = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-slate-800 text-left">
    <SEO 
      title="Disclaimer | Smart ePrint Solution" 
      description="Read the Smart ePrint Solution disclaimer regarding information, trademarks, warranties, and liability." 
      canonical="/disclaimer" 
    />
    
    <h1 className="text-4xl font-black mb-2 text-center uppercase tracking-tighter text-[#EF4056]">Disclaimer</h1>
    <p className="text-[10px] font-black text-slate-400 mb-12 text-center uppercase tracking-widest">Effective Date: April 30, 2026<br/>Last Updated: April 30, 2026</p>

    <div className="space-y-10">
      <p className="font-medium leading-relaxed italic border-l-4 border-slate-900 pl-6 bg-slate-50 py-4 rounded-r-2xl">The information contained on <strong>www.smarteprintsolution.com</strong> (“the Site”) is provided by Smart ePrint Solution for general informational and transactional purposes only.</p>

      <section>
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-900">1. Independent Third-Party Entity</h2>
        <p className="font-medium leading-relaxed text-slate-600">Smart ePrint Solution is an independent online retailer. We are not affiliated with, sponsored by, or authorized by any printer manufacturer or brand, unless explicitly stated. All brand names and trademarks are property of their respective owners.</p>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-900">2. No Professional Advice</h2>
        <p className="font-medium leading-relaxed text-slate-600">All information provided — including setup guides and troubleshooting — is for general informational purposes only. We do not claim to provide official manufacturer service.</p>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-900">3. Warranty Disclaimer</h2>
        <div className="p-6 bg-rose-50 border-2 border-rose-100 rounded-[2.5rem]">
           <p className="text-sm font-bold text-[#EF4056] leading-relaxed">Smart ePrint Solution does not provide any additional warranties — express or implied — including warranties of merchantability or fitness for a particular purpose.</p>
        </div>
      </section>

      <section className="bg-slate-900 text-white p-8 sm:p-12 rounded-[3rem] mt-16">
        <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter text-[#EF4056]">Contact Us</h2>
        <p className="mb-8 text-slate-300 font-medium leading-relaxed">For questions, clarifications, or concerns regarding this Disclaimer Policy, please contact us.</p>
        <div className="space-y-4 font-bold">
          <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">Email</span> support@smarteprintsolution.com</p>
          <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">Phone</span> +1-651-815-4630</p>
          <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">Location</span> 11397 Quincy St NE, Blaine, MN 55434</p>
        </div>
      </section>
    </div>
  </div>
);

export default Disclaimer;
