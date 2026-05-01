import React from 'react';
import { 
    Save, Shield, Globe, Mail, MapPin, 
    Bell, Lock, Cpu, Zap, Activity,
    Key, Smartphone, Database, Terminal
} from 'lucide-react';

const AdminSettings = () => {
    return (
        <div className="p-8 sm:p-12 space-y-12 animate-in fade-in duration-700 pb-32">
            {/* Premium Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                             <Terminal className="text-white" size={16} />
                         </div>
                         <span className="text-[10px] font-black text-blue-600">System Settings</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
                        Settings<span className="text-blue-600">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm max-w-xl">
                        Manage global site settings, notification preferences, and security options.
                    </p>
                </div>
                
                <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 flex items-center gap-3">
                    <Save size={20} />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* General Config */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[3rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/50 overflow-hidden">
                        <div className="px-10 py-8 border-b-2 border-slate-50 bg-slate-50/30 flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                                <Globe size={20} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-900 text-xs">Site Identity</h3>
                                <p className="text-[9px] font-black text-slate-400 mt-1">Branding and Contact Info</p>
                            </div>
                        </div>
                        <div className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 ml-2">Site Name</label>
                                    <input 
                                        type="text" defaultValue="Smart ePrint Solution" 
                                        className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-black text-slate-900 transition-all text-sm" 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 ml-2">Support Email</label>
                                    <input 
                                        type="email" defaultValue="support@smarteprint.com" 
                                        className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-black text-slate-900 transition-all text-sm" 
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 ml-2">Business Address</label>
                                <div className="relative">
                                    <input 
                                        type="text" defaultValue="95 Broadacre Dr, Kitchener, ON N2R 0S5, Canada" 
                                        className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-black text-slate-900 transition-all text-sm" 
                                    />
                                    <MapPin className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/50 overflow-hidden">
                        <div className="px-10 py-8 border-b-2 border-slate-50 bg-slate-50/30 flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-900 text-xs">Notifications</h3>
                                <p className="text-[9px] font-black text-slate-400 mt-1">Alert Preferences</p>
                            </div>
                        </div>
                        <div className="p-10 space-y-6">
                             <NotificationToggle label="Order Deployment Alerts" description="Receive real-time signals for every hardware acquisition." active />
                             <NotificationToggle label="Security Breach Protocol" description="Immediate notification for unauthorized kernel access." active />
                             <NotificationToggle label="Participant Messaging" description="Alert when a support signal is initiated." />
                        </div>
                    </div>
                </div>

                {/* Security & System Info */}
                <div className="space-y-8">
                    <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent opacity-50" />
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                                    <Shield className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-xl font-black text-white">Security</h3>
                            </div>
                            
                            <div className="space-y-6">
                                 <div className="flex justify-between items-center group/item cursor-pointer">
                                     <div>
                                         <p className="text-xs font-black text-white">2FA Security</p>
                                         <p className="text-[9px] font-bold text-slate-500 mt-1 italic">Status: Active</p>
                                     </div>
                                     <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Update</button>
                                 </div>
                                 <div className="h-px bg-white/5" />
                                 <div className="flex justify-between items-center group/item cursor-pointer">
                                     <div>
                                         <p className="text-xs font-black text-white">Admin Login</p>
                                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 italic">Last Modified: 2d ago</p>
                                     </div>
                                     <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/10">Modify</button>
                                 </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/50">
                         <div className="flex items-center gap-4 mb-10">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                                <Cpu size={20} />
                            </div>
                             <h3 className="text-xs font-black text-slate-900">System Info</h3>
                        </div>
                        <div className="space-y-6">
                             <SystemStat label="System Version" value="v4.2.0-stable" />
                             <SystemStat label="Database Speed" value="12ms" />
                             <SystemStat label="System Uptime" value="99.98%" />
                             <SystemStat label="Cache Rate" value="85%" />
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-500/20 text-center relative overflow-hidden group">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                         <Database className="mx-auto mb-6 opacity-20 group-hover:scale-110 transition-transform" size={60} />
                         <h4 className="text-lg font-black tracking-tighter mb-2">System Maintenance</h4>
                         <p className="text-[10px] font-black text-blue-200 mb-8">Optimize performance now</p>
                         <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-[10px] shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                             Run Optimization
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NotificationToggle = ({ label, description, active }) => (
    <div className="flex items-center justify-between group hover:bg-slate-50 p-4 rounded-2xl transition-all border border-transparent hover:border-slate-100">
        <div className="flex-1">
            <h4 className="font-black text-slate-900 text-sm tracking-tight">{label}</h4>
            <p className="text-[10px] font-bold text-slate-400 mt-1">{description}</p>
        </div>
        <button className={`w-14 h-8 rounded-full transition-all relative ${active ? 'bg-blue-600' : 'bg-slate-200'}`}>
             <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-sm ${active ? 'right-1' : 'left-1'}`} />
        </button>
    </div>
);

const SystemStat = ({ label, value }) => (
    <div className="flex justify-between items-center group">
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{label}</span>
         <span className="font-black text-slate-900 text-xs tabular-nums bg-slate-50 px-3 py-1 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">{value}</span>
    </div>
);

export default AdminSettings;
