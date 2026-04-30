import React from 'react'

function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-slate-800 text-left">
      <h1 className="text-4xl font-black mb-2 text-center uppercase tracking-tighter text-[#EF4056]">Terms & Conditions</h1>
      <p className="text-[10px] font-black text-slate-400 mb-12 text-center uppercase tracking-widest">Effective Date: April 30, 2026<br/>Last Updated: April 30, 2026</p>
      
      <div className="space-y-8">
        <p className="font-medium leading-relaxed">Welcome to Smart ePrint Solution (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing or using our website <a href="https://www.smarteprintsolution.com" className="text-[#EF4056] underline font-bold" target="_blank" rel="noopener noreferrer">www.smarteprintsolution.com</a> (&ldquo;the Site&rdquo;), you agree to comply with and be bound by the following Terms and Conditions.<br/>Please read these terms carefully before using our site.</p>
        
        <p className="font-black text-sm uppercase tracking-tight text-[#EF4056] border-2 border-[#EF4056] p-4 rounded-2xl text-center">If you do not agree with these Terms, please do not use our website.</p>

        <section>
          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight text-slate-900">1. General Overview</h2>
          <p className="font-medium leading-relaxed">Smart ePrint Solution is an independent online retailer offering printers, inks, toners, and related accessories. We operate as a third-party eCommerce company and are not affiliated, authorized, or endorsed by any specific printer brand or manufacturer unless explicitly stated.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight text-slate-900">2. Product Information & Availability</h2>
          <ul className="space-y-3 font-bold text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-[#EF4056]">•</span>
              We reserve the right to correct inaccuracies or omissions without prior notice.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#EF4056]">•</span>
              Change or discontinue products at any time.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#EF4056]">•</span>
              Refuse or cancel any order containing incorrect pricing or product information.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight text-slate-900">3. Pricing & Payments</h2>
          <p className="font-medium leading-relaxed mb-4">All prices are listed in USD unless otherwise stated. We accept major credit/debit cards and secure online payments processed through trusted third-party payment gateways.</p>
          <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100">
             <p className="font-black text-[10px] uppercase tracking-widest text-[#EF4056] mb-3">Payment Protocols</p>
             <ul className="space-y-2 text-sm font-bold">
               <li>✓ Secure SSL Encryption for all transactions</li>
               <li>✓ Third-party authorized settlement only</li>
               <li>✓ No full credit card details stored on our local servers</li>
             </ul>
          </div>
        </section>

        <section className="bg-slate-900 text-white p-8 sm:p-12 rounded-[3rem] mt-16">
          <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter text-[#EF4056]">Legal Support</h2>
          <p className="mb-8 text-slate-300 font-medium leading-relaxed">Smart ePrint Solution promotes its products through verified advertising platforms. We adhere to all advertising guidelines, ensuring truthful representation and transparency.</p>
          <div className="space-y-4 font-bold">
            <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">Compliance</span> support@smarteprintsolution.com</p>
            <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">Hotline</span> +1-651-815-4630</p>
            <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">HQ</span> 11397 Quincy St NE, Blaine, MN 55434</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TermsAndConditions
