import React from 'react';

const SetupGuide = () => {
    const steps = [
        { title: "Step 1: Unpack your printer", desc: "Remove all tape and packaging materials from inside and outside the printer." },
        { title: "Step 2: Connect to power", desc: "Plug the power cord into the printer and a wall outlet, then turn it on." },
        { title: "Step 3: Install ink cartridges", desc: "Open the cartridge access door and insert the setup cartridges provided." },
        { title: "Step 4: Load paper", desc: "Pull out the input tray and load plain white paper." },
        { title: "Step 5: Install printer software", desc: "Go to 123.hp.com/setup on your computer to download and install the drivers." }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Step-by-Step Setup Guide</h2>
                    <p className="text-slate-500 font-medium">Follow these instructions to get started with your HP printer.</p>
                </div>
                <div className="space-y-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex gap-8 items-start">
                            <div className="w-16 h-16 rounded-3xl bg-[#007db3] text-white flex-shrink-0 flex items-center justify-center text-2xl font-black">
                                {idx + 1}
                            </div>
                            <div className="pt-2">
                                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                                <p className="text-slate-600 text-lg leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SetupGuide;
