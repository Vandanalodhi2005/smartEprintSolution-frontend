import React from "react";
import { X, Minus, Plus } from "lucide-react";

const CartTable = ({ cartItems = [], onQtyChange, onRemove, onApplyCoupon }) => {
  return (
    <div className="w-full bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm">
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-slate-100">
              <th className="py-8 px-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Product Specification</th>
              <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Unit Price</th>
              <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Quantity</th>
              <th className="py-8 px-10 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {cartItems.map((item) => (
              <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-8 px-10">
                  <div className="flex items-center gap-6">
                    <button onClick={() => onRemove(item.id)} className="p-2 rounded-xl bg-slate-50 text-slate-300 hover:text-[#EF4056] hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100">
                      <X size={16} />
                    </button>
                    <div className="w-20 h-20 bg-white rounded-2xl border border-slate-100 p-2 shadow-sm">
                       <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                       <p className="font-black text-slate-900 uppercase tracking-tight text-sm mb-1">{item.name}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU: {item.id.substring(0,8)}</p>
                    </div>
                  </div>
                </td>
                <td className="py-8 px-6 font-black text-slate-900">${(item.price || 0).toFixed(2)}</td>
                <td className="py-8 px-6">
                  <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100 w-fit">
                    <button onClick={() => onQtyChange(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900"><Minus size={14}/></button>
                    <span className="w-8 text-center font-black text-sm text-slate-900">{item.qty}</span>
                    <button onClick={() => onQtyChange(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900"><Plus size={14}/></button>
                  </div>
                </td>
                <td className="py-8 px-10 font-black text-slate-900 text-right text-lg">${(item.price * item.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden divide-y divide-slate-100">
        {cartItems.map((item) => (
          <div key={item.id} className="p-6 space-y-4">
             <div className="flex gap-4">
                <div className="w-24 h-24 bg-white rounded-2xl border border-slate-100 p-2 shadow-sm flex-shrink-0">
                   <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-start">
                      <p className="font-black text-slate-900 uppercase tracking-tight text-sm line-clamp-2">{item.name}</p>
                      <button onClick={() => onRemove(item.id)} className="text-slate-300 ml-2"><X size={20}/></button>
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">${item.price.toFixed(2)} / unit</p>
                </div>
             </div>
             <div className="flex items-center justify-between pt-2">
                <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100 w-fit">
                   <button onClick={() => onQtyChange(item.id, item.qty - 1)} className="w-10 h-10 flex items-center justify-center text-slate-400"><Minus size={16}/></button>
                   <span className="w-10 text-center font-black text-slate-900">{item.qty}</span>
                   <button onClick={() => onQtyChange(item.id, item.qty + 1)} className="w-10 h-10 flex items-center justify-center text-slate-400"><Plus size={16}/></button>
                </div>
                <p className="font-black text-slate-900 text-xl">${(item.price * item.qty).toFixed(2)}</p>
             </div>
          </div>
        ))}
      </div>

      </div>
    </div>
  );
};

export default CartTable;
