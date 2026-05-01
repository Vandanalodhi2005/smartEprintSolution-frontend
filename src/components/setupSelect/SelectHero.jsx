import React from 'react';

const SelectHero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-[#007db3]">
            <div className="absolute inset-0 z-0 opacity-10">
                <img src="/hero_background_image.webp" alt="Background" className="w-full h-full object-cover" />
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">
                    Setup your HP Printer
                </h1>
                <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto opacity-90 leading-relaxed">
                    Follow our guided steps to complete your 123.hp.com/setup and get your printer running in minutes.
                </p>
            </div>
        </section>
    );
};

export default SelectHero;
