import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingCart,
    MessageSquare,
    Settings,
    BarChart3,
    Layers,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ExternalLink
} from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard/' },
        { name: 'Categories', icon: Layers, path: '/admin/categories/' },
        { name: 'Products', icon: Package, path: '/admin/products/' },
        { name: 'Orders', icon: ShoppingCart, path: '/admin/orders/' },
        { name: 'Customers', icon: Users, path: '/admin/customers/' },
        { name: 'Live Chat', icon: MessageSquare, path: '/admin/chat/' },
        { name: 'Analytics', icon: BarChart3, path: '/admin/analytics/' },
        { name: 'System Settings', icon: Settings, path: '/admin/settings/' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r-2 border-slate-100 flex flex-col transition-transform duration-300 transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center justify-between px-8 border-b-2 border-slate-50">
                    <Link to="/admin/dashboard/" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#EF4056] rounded-lg flex items-center justify-center shadow-lg shadow-rose-100">
                           <Settings size={18} className="text-white animate-spin-slow" />
                        </div>
                        <span className="font-black text-slate-900 text-sm uppercase tracking-tighter">Admin <span className="text-[#EF4056]">Hub</span></span>
                    </Link>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-400">
                        <ChevronLeft size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 group ${
                                    isActive
                                        ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon size={20} className={isActive ? 'text-[#EF4056]' : 'group-hover:scale-110 transition-transform'} />
                                    <span>{item.name}</span>
                                    {isActive && <div className="ml-auto w-1.5 h-1.5 bg-[#EF4056] rounded-full shadow-glow" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer Link */}
                <div className="p-6 border-t-2 border-slate-50">
                    <Link
                        to="/"
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-[#EF4056]/5 transition-colors border border-slate-100"
                    >
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store Front</span>
                            <span className="text-xs font-black text-slate-900 uppercase">View Live Site</span>
                        </div>
                        <ExternalLink size={16} className="text-slate-300 group-hover:text-[#EF4056] transition-colors" />
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
