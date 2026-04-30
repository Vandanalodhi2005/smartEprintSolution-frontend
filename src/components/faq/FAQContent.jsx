import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FAQContent = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is your hardware deployment (return) policy?",
            answer: "You can return most new, unopened items within 30 days of delivery for a full refund. If the item is opened or used, we offer exchanges or store credit. Hardware must be in original condition with all internal protection intact."
        },
        {
            question: "How do I monitor my logistics (order) status?",
            answer: "Utilize our 'Track Order' portal with your unique deployment ID. Real-time updates are provided at every transit node, from initial processing to final delivery."
        },
        {
            question: "What regions are supported for logistics?",
            answer: "Currently, we provide priority logistics across the United States and Canada. International deployment capabilities are under active development."
        },
        {
            question: "How do I access technical support?",
            answer: "Our support protocols are accessible 24/7 via live encrypted chat, priority email, or our dedicated hardware hotline. We're here to resolve any technical bottlenecks."
        },
        {
            question: "What transaction protocols are accepted?",
            answer: "We support all major financial networks including Visa, MasterCard, Amex, and Discover. For enhanced security, we also integrate with PayPal, Apple Pay, and Google Pay."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${
                            activeIndex === index 
                            ? 'border-[#EF4056] bg-rose-50/20' 
                            : 'border-slate-100 hover:border-slate-200 bg-white shadow-sm'
                        }`}
                    >
                        <button
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full flex justify-between items-center p-8 sm:p-10 text-left outline-none"
                        >
                            <div className="flex gap-6 items-center">
                               <span className={`text-[10px] font-black w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-colors ${activeIndex === index ? 'bg-[#EF4056] border-[#EF4056] text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                               </span>
                               <h2 className={`text-lg sm:text-xl font-black uppercase tracking-tight transition-colors ${
                                   activeIndex === index ? 'text-slate-900' : 'text-slate-500'
                               }`}>
                                   {faq.question}
                               </h2>
                            </div>
                            <div className={`p-2 rounded-xl transition-all duration-300 ${
                                activeIndex === index ? 'bg-[#EF4056] text-white rotate-180' : 'bg-slate-100 text-slate-400'
                            }`}>
                                <ChevronDown size={20} />
                            </div>
                        </button>
                        
                        <div className={`transition-all duration-500 ease-in-out ${
                            activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <div className="px-10 sm:px-24 pb-12 text-slate-600 text-base font-medium leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQContent;
