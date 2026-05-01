import React from 'react';

const FooterSetup = () => {
    return (
        <footer className="bg-slate-900 text-white py-20 border-t border-slate-800">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-10">
                    <img src="/logo.webp" alt="Logo" className="h-10 mx-auto brightness-0 invert opacity-50" />
                </div>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-10 leading-relaxed">
                    Disclaimer: Smart ePrint Solution is an independent service provider for printer support. We are not affiliated with HP, Canon, Epson, or any other printer brand unless explicitly stated. All trademarks and brands mentioned are for informational purposes only.
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <a href="/privacy-policy/" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms-and-conditions/" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="/return-refund-policy/" className="hover:text-white transition-colors">Refund Policy</a>
                    <a href="/contact-us/" className="hover:text-white transition-colors">Contact Support</a>
                </div>
                <div className="mt-10 pt-10 border-t border-slate-800/50 text-[9px] font-bold text-slate-600 uppercase">
                    © {new Date().getFullYear()} Smart ePrint Solution. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default FooterSetup;
