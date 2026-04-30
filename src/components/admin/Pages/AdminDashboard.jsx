import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnalytics } from '../../../redux/actions/analyticsActions';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    Calendar,
    CreditCard,
    Package,
    ArrowRight,
    Activity,
    Layers,
    Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardSkeleton } from '../../common/Skeleton';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const analyticsState = useSelector((state) => state.analytics);
    const { loading, analytics, error } = analyticsState;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchAnalytics());
        }
    }, [dispatch, userInfo]);

    const statsDisplay = analytics ? [
        {
            label: 'Net Revenue',
            value: `$${analytics.revenue.total.toLocaleString()}`,
            change: `${analytics.revenue.growth >= 0 ? '+' : ''}${analytics.revenue.growth}%`,
            icon: DollarSign,
            color: 'text-emerald-400',
            glow: 'shadow-emerald-500/20',
            bg: 'bg-emerald-500/10'
        },
        {
            label: 'Active Orders',
            value: analytics.orders.total.toString(),
            change: `${analytics.orders.growth >= 0 ? '+' : ''}${analytics.orders.growth}%`,
            icon: Zap,
            color: 'text-[#EF4056]',
            glow: 'shadow-rose-500/20',
            bg: 'bg-rose-500/10'
        },
        {
            label: 'User Traffic',
            value: analytics.customers.total.toString(),
            change: `${analytics.customers.growth >= 0 ? '+' : ''}${analytics.customers.growth}%`,
            icon: Activity,
            color: 'text-sky-400',
            glow: 'shadow-sky-500/20',
            bg: 'bg-sky-500/10'
        },
    ] : [];

    const statusStyles = {
        'Processing': 'text-sky-400 bg-sky-400/10 border-sky-400/20',
        'Shipped': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
        'Delivered': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        'Cancelled': 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20">
            {/* NEW HI-FIDELITY HEADER */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                        System Insights
                        <span className="text-xs font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest h-fit">v2.0</span>
                    </h1>
                    <div className="mt-3 flex items-center gap-4">
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Operational Node: MN-BASE-01</p>
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 bg-white p-3 rounded-[2rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50 group">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#EF4056] transition-colors">
                      <Calendar size={20} />
                   </div>
                   <div className="pr-6">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Terminal Date</span>
                      <span className="text-sm font-black text-slate-900 uppercase">
                          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                   </div>
                </div>
            </div>

            {/* STATS DECK */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <DashboardSkeleton />
                ) : error ? (
                    <div className="col-span-full p-12 bg-rose-50 rounded-[3rem] border-2 border-rose-100 text-rose-600 font-black uppercase text-xs tracking-[0.2em] text-center">
                        Sync Protocol Failure: {error}
                    </div>
                ) : statsDisplay.map((stat, i) => (
                    <div key={i} className="relative group">
                        <div className={`absolute inset-0 ${stat.bg} blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-[3rem]`}></div>
                        <div className="relative bg-white p-10 rounded-[3rem] border-2 border-slate-50 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                            <div className="flex justify-between items-start mb-10">
                                <div className={`p-5 rounded-[1.5rem] ${stat.bg} ${stat.color} shadow-lg ${stat.glow} group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={28} />
                                </div>
                                <div className={`flex items-center text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {stat.change} <TrendingUp size={14} className="ml-2" />
                                </div>
                            </div>
                            <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">{stat.value}</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* DATA GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Logistics Queue */}
                <div className="lg:col-span-8 bg-white rounded-[3.5rem] border-2 border-slate-50 shadow-xl shadow-slate-200/20 overflow-hidden">
                    <div className="px-12 py-10 flex justify-between items-center border-b-2 border-slate-50 bg-slate-50/30">
                        <div>
                            <h2 className="font-black text-slate-900 uppercase tracking-tighter text-2xl">Logistics Queue</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time order synchronization</p>
                        </div>
                        <button onClick={() => navigate('/admin/orders')} className="w-12 h-12 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#EF4056] hover:border-[#EF4056] transition-all group">
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-12 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Order Token</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Recipient Entity</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Quota</th>
                                    <th className="px-12 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-50">
                                {loading ? (
                                    <tr><td colSpan="4" className="py-24 text-center text-slate-300 font-black uppercase text-xs tracking-widest animate-pulse">Establishing Connection...</td></tr>
                                ) : analytics?.recentOrders?.map((order) => (
                                    <tr key={order._id} className="group hover:bg-slate-50/80 transition-colors cursor-pointer" onClick={() => navigate('/admin/orders')}>
                                        <td className="px-12 py-8">
                                           <span className="font-black text-slate-900 text-sm tracking-tighter">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                                        </td>
                                        <td className="px-8 py-8">
                                            <div className="font-black text-slate-900 text-sm uppercase tracking-tight">{order.user?.name || 'Guest Agent'}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">{order.user?.email || 'External Entity'}</div>
                                        </td>
                                        <td className="px-8 py-8">
                                           <span className="font-black text-slate-900 text-lg tracking-tighter">${order.totalPrice.toFixed(2)}</span>
                                        </td>
                                        <td className="px-12 py-8 text-right">
                                            <span className={`px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.15em] border-2 shadow-sm ${statusStyles[order.status] || 'text-slate-400 bg-slate-50 border-slate-100'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Panel: Resource Usage */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl shadow-slate-300 relative overflow-hidden group">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4056] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500 blur-[80px] opacity-10"></div>
                        
                        <h3 className="font-black text-2xl uppercase tracking-tighter mb-10 flex items-center gap-3">
                            <Layers size={24} className="text-[#EF4056]" />
                            Resources
                        </h3>
                        
                        <div className="space-y-8 relative z-10">
                            {[
                                { name: 'Active Inventory', count: analytics?.activeStock || 0, icon: Package, color: 'text-rose-400', progress: 75 },
                                { name: 'Network Traffic', count: analytics?.customers.total || 0, icon: Activity, color: 'text-sky-400', progress: 45 },
                                { name: 'Revenue Flow', count: analytics?.orders.total || 0, icon: CreditCard, color: 'text-emerald-400', progress: 90 },
                            ].map((item, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <item.icon size={16} className={item.color} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.name}</span>
                                        </div>
                                        <span className="font-black text-lg tracking-tighter">{item.count}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className={`h-full bg-white rounded-full transition-all duration-1000`} style={{ width: `${item.progress}%`, backgroundColor: item.color === 'text-rose-400' ? '#EF4056' : item.color === 'text-sky-400' ? '#38BDF8' : '#10B981' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            onClick={() => navigate('/admin/settings/')}
                            className="w-full mt-12 py-5 bg-white text-slate-900 rounded-[1.8rem] font-black uppercase text-[10px] tracking-[0.25em] flex items-center justify-center gap-3 group/btn hover:bg-[#EF4056] hover:text-white transition-all shadow-xl shadow-black/20"
                        >
                            Global Settings
                            <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
