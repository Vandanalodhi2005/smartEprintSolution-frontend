import React from 'react';
import { Settings, Printer, Wifi, AlertTriangle } from 'lucide-react';

const IssueSelector = () => {
    const issues = [
        { icon: <Settings size={40} />, title: "New Printer Setup", desc: "Guide for first-time installation and configuration." },
        { icon: <Printer size={40} />, title: "Printer Offline", desc: "Fix connectivity issues and status errors." },
        { icon: <Wifi size={40} />, title: "Wireless Connection", desc: "Set up and troubleshoot Wi-Fi printing." },
        { icon: <AlertTriangle size={40} />, title: "Error Message", desc: "Resolve common printer hardware and software errors." }
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Identify Your Issue</h2>
                    <div className="w-24 h-2 bg-[#007db3] mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    {issues.map((issue, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer group border border-slate-100 flex flex-col items-center text-center">
                            <div className="mb-6 text-[#007db3] group-hover:scale-110 transition-transform">{issue.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{issue.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{issue.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IssueSelector;
