import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white w-full overflow-hidden">
      {/* Top Graphic */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#EF4056] to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <img 
              src="/smart-e-print-logo-footer.png" 
              alt="Smart ePrint Solution" 
              className="h-10 w-auto brightness-0 invert" 
            />
            <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
              Redefining the digital printing landscape with precision engineering, intelligent support, and sustainable hardware solutions.
            </p>
            <div className="flex items-center gap-4">
               {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-[#EF4056] hover:border-[#EF4056] transition-all duration-300">
                   <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EF4056] mb-8">Navigation</h3>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Home Base</Link></li>
              <li><Link to="/shop/" className="text-slate-400 hover:text-white transition-colors">Hardware Shop</Link></li>
              <li><Link to="/about/" className="text-slate-400 hover:text-white transition-colors">Our Ethos</Link></li>
              <li><Link to="/faq/" className="text-slate-400 hover:text-white transition-colors">Knowledge Base</Link></li>
              <li><Link to="/contact-us/" className="text-slate-400 hover:text-white transition-colors">Direct Support</Link></li>
            </ul>
          </div>

          {/* Legal / Policies */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EF4056] mb-8">Governance</h3>
            <ul className="space-y-4 font-bold text-sm text-slate-400">
              <li><Link to="/privacy-policy/" className="hover:text-white transition-colors">Privacy Protocol</Link></li>
              <li><Link to="/terms-and-conditions/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/return-refund-policy/" className="hover:text-white transition-colors">Refund Guidelines</Link></li>
              <li><Link to="/shipping-policy/" className="hover:text-white transition-colors">Logistics Policy</Link></li>
              <li><Link to="/disclaimer/" className="hover:text-white transition-colors">Legal Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EF4056] mb-8">Connect</h3>
            <div className="space-y-6">
               <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-slate-600 mt-1" />
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">11397 Quincy St NE,<br/>Blaine, MN 55434</p>
               </div>
               <div className="flex items-center gap-4">
                  <Mail size={20} className="text-slate-600" />
                  <p className="text-sm font-bold">support@smarteprintsolution.com</p>
               </div>
               <div className="flex items-center gap-4">
                  <Phone size={20} className="text-slate-600" />
                  <p className="text-sm font-bold">+1-651-815-4630</p>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Secure Payments via</span>
              <div className="flex items-center gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                 <img src="https://img.icons8.com/color/38/visa.png" alt="Visa" className="h-6" />
                 <img src="https://img.icons8.com/color/38/mastercard-logo.png" alt="Mastercard" className="h-6" />
                 <img src="https://img.icons8.com/color/38/paypal.png" alt="Paypal" className="h-6" />
                 <img src="https://img.icons8.com/color/38/amex.png" alt="Amex" className="h-6" />
              </div>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
             © 2026 Smart ePrint Solution. Built with excellence.
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
