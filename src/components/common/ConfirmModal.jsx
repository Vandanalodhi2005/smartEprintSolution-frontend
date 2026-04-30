import React from "react";
import { X, AlertCircle } from "lucide-react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "danger" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors">
          <X size={24} />
        </button>
        
        <div className="flex flex-col items-center text-center">
           <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-inner ${type === 'danger' ? 'bg-rose-50 text-[#EF4056]' : 'bg-blue-50 text-blue-600'}`}>
              <AlertCircle size={32} />
           </div>
           
           <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">{title}</h3>
           <p className="text-slate-500 font-medium leading-relaxed mb-10">{message}</p>
           
           <div className="flex gap-4 w-full">
              <button onClick={onClose} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all">
                {cancelText}
              </button>
              <button onClick={onConfirm} className={`flex-1 py-4 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl ${type === 'danger' ? 'bg-[#EF4056] hover:bg-rose-600 shadow-rose-100' : 'bg-slate-900 hover:bg-black shadow-slate-100'}`}>
                {confirmText}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
