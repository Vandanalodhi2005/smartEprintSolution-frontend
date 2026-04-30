import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

const CartTotalsCard = ({ subtotal = 0, total = 0, onCheckout }) => {
  return (
    <div className="w-full bg-slate-900 text-white rounded-[3rem] p-10 sm:p-12 shadow-2xl shadow-slate-200 sticky top-32">
      <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 text-[#EF4056]">Summary</h2>
      
      <div className="space-y-6 mb-12">
        <div className="flex justify-between items-baseline border-b border-slate-800 pb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Subtotal</span>
          <span className="text-2xl font-black tracking-tighter">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Logistics Fees</span>
          <span className="text-[9px] font-black uppercase px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full tracking-widest">Included</span>
        </div>

        <div className="pt-6 flex justify-between items-baseline">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EF4056]">Grand Total</span>
          <span className="text-4xl font-black tracking-tighter">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-white text-slate-900 py-6 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-[#EF4056] hover:text-white transition-all flex items-center justify-center gap-3 group"
      >
        Initiate Checkout
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
      </button>

      <div className="mt-8 flex items-center justify-center gap-3 py-4 bg-slate-800/50 rounded-2xl">
         <ShieldCheck size={18} className="text-[#EF4056]" />
         <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Secure Protocol Active</span>
      </div>
    </div>
  );
};

export default CartTotalsCard;
