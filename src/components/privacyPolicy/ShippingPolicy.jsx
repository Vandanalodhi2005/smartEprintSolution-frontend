import React from "react";
import SEO from '../common/SEO';

const ShippingPolicy = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-slate-800 text-left">
    <SEO 
      title="Shipping Policy | Smart ePrint Solution" 
      description="Read the Smart ePrint Solution shipping policy for order processing, shipping methods, delivery times, and more." 
      canonical="/shipping-policy" 
    />
    
    <h1 className="text-4xl font-black mb-2 text-center uppercase tracking-tighter text-[#EF4056]">Shipping Policy</h1>
    <p className="text-[10px] font-black text-slate-400 mb-12 text-center uppercase tracking-widest">Effective Date: April 30, 2026<br/>Last Updated: April 30, 2026</p>

    <div className="space-y-10">
      <p className="font-medium leading-relaxed">Thank you for shopping with Smart ePrint Solution. This Shipping Policy outlines how we process, ship, and deliver your orders placed on <strong>www.smarteprintsolution.com</strong> (“the Site”). Our goal is to ensure your products reach you safely and on time.</p>

      <section>
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-900">1. Order Processing Time</h2>
        <ul className="space-y-3 font-bold text-sm text-slate-600">
          <li className="flex items-start gap-3"><span className="text-[#EF4056] mt-1">•</span> Orders are typically processed within 1–2 business days after payment confirmation.</li>
          <li className="flex items-start gap-3"><span className="text-[#EF4056] mt-1">•</span> Orders placed on weekends or public holidays are processed on the next business day.</li>
          <li className="flex items-start gap-3"><span className="text-[#EF4056] mt-1">•</span> Once your order is processed, you will receive a confirmation email with tracking details.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-900">2. Shipping Methods & Delivery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Standard</p>
            <p className="text-xl font-black text-slate-900">3–7 Days</p>
          </div>
          <div className="p-6 bg-rose-50 border-2 border-rose-100 rounded-[2rem] text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#EF4056] mb-2">Expedited</p>
            <p className="text-xl font-black text-[#EF4056]">2–4 Days</p>
          </div>
          <div className="p-6 bg-slate-900 border-2 border-slate-800 rounded-[2rem] text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Priority</p>
            <p className="text-xl font-black text-white">1–2 Days</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-900">3. Shipping Charges</h2>
        <p className="font-medium text-slate-600 leading-relaxed mb-4">Shipping costs are calculated at checkout based on delivery location, package weight, and chosen method.</p>
        <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-100">
           <p className="text-sm font-bold text-[#EF4056] flex items-center gap-3">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             Occasionally, free shipping promotions may apply to select products or orders.
           </p>
        </div>
      </section>

      <section className="bg-slate-900 text-white p-8 sm:p-12 rounded-[3rem] mt-16">
        <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter text-[#EF4056]">Logistics Support</h2>
        <p className="mb-8 text-slate-300 font-medium leading-relaxed">If you have any questions about shipping or need help tracking your order, please reach out to our logistics team.</p>
        <div className="space-y-4 font-bold">
          <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">Support</span> support@smarteprintsolution.com</p>
          <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">Contact</span> +1-651-815-4630</p>
          <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">Warehouse</span> 11397 Quincy St NE, Blaine, MN 55434</p>
        </div>
      </section>
    </div>
  </div>
);

export default ShippingPolicy;
