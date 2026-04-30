import React from 'react'

function RefundReturnPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-slate-800 text-left">
      <h1 className="text-4xl font-black mb-2 text-center uppercase tracking-tighter text-[#EF4056]">Return & Refund Policy</h1>
      <p className="text-[10px] font-black text-slate-400 mb-12 text-center uppercase tracking-widest">Effective Date: April 30, 2026<br/>Last Updated: April 30, 2026</p>
      
      <div className="space-y-10">
        <p className="font-medium leading-relaxed">Thank you for shopping with Smart ePrint Solution. We value your satisfaction and want to ensure your shopping experience is smooth and worry-free. This policy explains how to request a return, replacement, or refund for your purchase made on <strong>www.smarteprintsolution.com</strong>.</p>

        <section>
          <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-900">1. Eligibility for Returns</h2>
          <p className="font-medium mb-4">You may request a return if:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 font-bold text-sm">
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#EF4056] rounded-full"></div> Damaged or Defective Item
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#EF4056] rounded-full"></div> Incorrect Item Received
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#EF4056] rounded-full"></div> Doesn't Match Description
            </li>
          </ul>
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-100">
             <p className="text-sm font-bold text-[#EF4056] mb-2 uppercase tracking-tight">Requirements:</p>
             <ul className="text-xs space-y-2 font-medium">
               <li>• Request must be made within 7 days of delivery.</li>
               <li>• Item must be unused and in original packaging.</li>
               <li>• All accessories, manuals, and proof of purchase must be included.</li>
             </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-900">2. Non-Returnable Items</h2>
          <ul className="space-y-3 font-bold text-sm text-slate-600">
            <li className="flex items-start gap-3"><span className="text-[#EF4056] mt-1">•</span> Opened or partially used ink/toner cartridges.</li>
            <li className="flex items-start gap-3"><span className="text-[#EF4056] mt-1">•</span> Products damaged due to improper installation or misuse.</li>
            <li className="flex items-start gap-3"><span className="text-[#EF4056] mt-1">•</span> Items marked &ldquo;Final Sale&rdquo; or &ldquo;Non-Returnable&rdquo;.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-900">3. Return Process</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-center p-4 bg-white border-2 border-slate-100 rounded-2xl">
               <span className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-xl font-black">01</span>
               <p className="text-sm font-bold">Contact support@smarteprintsolution.com with your order number.</p>
            </div>
            <div className="flex gap-4 items-center p-4 bg-white border-2 border-slate-100 rounded-2xl">
               <span className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-xl font-black">02</span>
               <p className="text-sm font-bold">Provide a brief reason and supporting photos of the issue.</p>
            </div>
            <div className="flex gap-4 items-center p-4 bg-[#EF4056] text-white rounded-2xl shadow-lg shadow-red-200">
               <span className="w-10 h-10 bg-white text-[#EF4056] flex items-center justify-center rounded-xl font-black">03</span>
               <p className="text-sm font-bold">Await your Return Authorization (RA) number and instructions.</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white p-8 sm:p-12 rounded-[3rem] mt-16">
          <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter text-[#EF4056]">Support Center</h2>
          <p className="mb-8 text-slate-300 font-medium leading-relaxed">Our support team is available 24/7 to help you with the return process and ensure your satisfaction.</p>
          <div className="space-y-4 font-bold">
            <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">Resolution</span> support@smarteprintsolution.com</p>
            <p className="flex items-center gap-4"><span className="text-slate-500 uppercase text-[10px] tracking-widest w-24">Hotline</span> +1-651-815-4630</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RefundReturnPolicy
