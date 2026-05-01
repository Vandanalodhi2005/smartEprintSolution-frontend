import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is the return policy?",
            answer:
                "You can return most new, unopened items within 30 days of delivery for a full refund. If the item is opened or used, we offer exchanges or store credit. Please ensure the item is returned in its original packaging with all accessories included.",
        },
        {
            question: "How do I track my order?",
            answer:
                "You can track your order through the 'Track Order' page using your unique order ID. After your purchase, you'll receive an email with tracking details. Additionally, you can log into your account and view your order status.",
        },
        {
            question: "Do you offer international shipping?",
            answer:
                "Currently, we offer shipping within the United States and Canada. We are working on expanding our international shipping options. Please check the shipping section at checkout to see supported regions.",
        },
        {
            question: "How can I contact customer support?",
            answer:
                "You can reach our customer support team via live chat, email, or phone. Our support team is available 24/7 to assist you with any issues regarding your orders, products, or our services.",
        },
        {
            question: "What payment methods do you accept?",
            answer:
                "We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. We also support PayPal, Apple Pay, and Google Pay for secure transactions.",
        },
        {
            question: "Are the products authentic?",
            answer:
                "Yes, all products sold on Smart ePrint Solution are 100% authentic and sourced from reputable manufacturers and authorized distributors. We guarantee the quality and authenticity of every item.",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-12 bg-white">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-12 text-center leading-none">
                Frequently Asked Questions
            </h1>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`rounded-[2rem] border-2 transition-all duration-300 overflow-hidden ${
                            activeIndex === index 
                            ? 'border-[#EF4056] bg-rose-50/30' 
                            : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                    >
                        <button
                            onClick={() => toggleAnswer(index)}
                            className="w-full flex justify-between items-center p-6 sm:p-8 text-left outline-none"
                        >
                            <h2 className={`text-lg sm:text-xl font-black transition-colors ${
                                activeIndex === index ? 'text-[#EF4056]' : 'text-slate-900'
                            }`}>
                                {faq.question}
                            </h2>
                            <div className={`p-2 rounded-xl transition-all duration-300 ${
                                activeIndex === index ? 'bg-[#EF4056] text-white rotate-180' : 'bg-slate-100 text-slate-400'
                            }`}>
                                {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </button>
                        
                        <div className={`transition-all duration-300 ease-in-out ${
                            activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <div className="px-6 sm:px-8 pb-8 text-slate-600 text-base font-medium leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
