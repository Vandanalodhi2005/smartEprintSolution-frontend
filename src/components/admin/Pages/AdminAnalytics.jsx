import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    BarChart3, TrendingUp, Users, DollarSign, 
    ArrowUp, ArrowDown, AlertCircle, Loader2,
    Calendar, Activity, Zap, PieChart, TrendingDown,
    ArrowUpRight, ArrowDownRight, Globe, Shield
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { fetchAnalytics } from '../../../redux/actions/analyticsActions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

const AdminAnalytics = () => {
    const dispatch = useDispatch();
    const { analytics, loading, error } = useSelector((state) => state.analytics);

    useEffect(() => {
        dispatch(fetchAnalytics());
    }, [dispatch]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatPercentage = (value) => {
        return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
    };

    const prepareRevenueChartData = () => {
        if (!analytics?.revenueByMonth) return null;

        const months = analytics.revenueByMonth.map(item => {
            const date = new Date(item._id.year, item._id.month - 1);
            return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
        });

        return {
            labels: months,
            datasets: [
                {
                    label: 'NET REVENUE',
                    data: analytics.revenueByMonth.map(item => item.revenue),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    borderWidth: 4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#3b82f6',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'TRAFFIC VOLUME',
                    data: analytics.revenueByMonth.map(item => item.orders * 100), // Scaling for visibility
                    borderColor: '#10b981',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false,
                    tension: 0.4,
                    yAxisID: 'orders',
                },
            ],
        };
    };

    const prepareOrdersStatusData = () => {
        if (!analytics?.ordersByStatus) return null;

        const statusColors = {
            'Delivered': '#10b981',
            'Processing': '#3b82f6',
            'Shipped': '#8b5cf6',
            'Cancelled': '#ef4444',
            'Pending': '#f59e0b'
        };

        return {
            labels: analytics.ordersByStatus.map(item => item._id.toUpperCase()),
            datasets: [
                {
                    data: analytics.ordersByStatus.map(item => item.count),
                    backgroundColor: analytics.ordersByStatus.map(item =>
                        statusColors[item._id] || '#64748b'
                    ),
                    hoverOffset: 20,
                    borderWidth: 0,
                    borderRadius: 10,
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0f172a',
                padding: 15,
                titleFont: { size: 10, weight: 'bold', family: 'Inter' },
                bodyFont: { size: 12, family: 'Inter' },
                displayColors: false,
                callbacks: {
                    label: (context) => context.datasetIndex === 0 
                        ? ` REVENUE: ${formatCurrency(context.parsed.y)}`
                        : ` ORDERS: ${context.parsed.y / 100}`
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 10, weight: '900' }, color: '#94a3b8' }
            },
            y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: { 
                    font: { size: 10, weight: 'bold' }, 
                    color: '#94a3b8',
                    callback: (value) => '$' + value / 1000 + 'K'
                }
            },
            orders: { display: false, position: 'right' }
        }
    };

    return (
        <div className="p-8 sm:p-12 space-y-12 animate-in fade-in duration-700 pb-32">
            {/* Premium Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                             <TrendingUp className="text-white" size={16} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Performance Intelligence</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                        Analytics<span className="text-blue-600">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm max-w-xl">
                        Deep dive into platform fiscality, growth trajectories, and operational distribution metrics.
                    </p>
                </div>
                
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-50 shadow-xl shadow-slate-100/50">
                     <Calendar className="text-slate-400" size={18} />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Fiscal Quarter Q2 2026</span>
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </div>
            </div>

            {/* Error/Loading Handling */}
            {error && (
                <div className="p-8 bg-rose-50 border-2 border-rose-100 rounded-[2rem] flex items-center gap-6 text-rose-600 animate-in slide-in-from-top-4">
                    <AlertCircle size={32} />
                    <div>
                         <p className="font-black uppercase tracking-widest text-xs">Kernel Error Detected</p>
                         <p className="text-sm font-bold opacity-80">{error}</p>
                    </div>
                </div>
            )}

            {/* High-Performance Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {loading ? (
                    [...Array(4)].map((_, i) => <div key={i} className="h-40 bg-white rounded-[2.5rem] border-2 border-slate-50 animate-pulse" />)
                ) : (
                    <>
                        <StatCard 
                            label="Net Revenue" value={formatCurrency(analytics?.revenue?.total || 0)} 
                            change={formatPercentage(analytics?.revenue?.growth || 0)} icon={DollarSign} color="blue" 
                        />
                        <StatCard 
                            label="Traffic Load" value={analytics?.orders?.total || 0} 
                            change={formatPercentage(analytics?.orders?.growth || 0)} icon={Activity} color="emerald" 
                        />
                        <StatCard 
                            label="Identity Growth" value={analytics?.customers?.total || 0} 
                            change={formatPercentage(analytics?.customers?.growth || 0)} icon={Users} color="purple" 
                        />
                        <StatCard 
                            label="Avg. Allocation" 
                            value={formatCurrency(analytics?.orders?.total > 0 ? (analytics?.revenue?.total / analytics?.orders?.total) : 0)} 
                            change="+4.2%" icon={Zap} color="amber" 
                        />
                    </>
                )}
            </div>

            {/* Advanced Visualization Tier */}
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-10">
                {/* Revenue Momentum Chart */}
                <div className="2xl:col-span-2 bg-white p-10 rounded-[3.5rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                         <TrendingUp size={200} />
                    </div>
                    <div className="flex justify-between items-start mb-12 relative z-10">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">Revenue Momentum</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">6-Month Fiscal Projection</p>
                        </div>
                        <div className="flex gap-3">
                             <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">Net Revenue</span>
                             </div>
                             <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Volume</span>
                             </div>
                        </div>
                    </div>
                    <div className="h-[400px] relative z-10">
                        {loading ? <ChartLoader /> : prepareRevenueChartData() && <Line data={prepareRevenueChartData()} options={chartOptions} />}
                    </div>
                </div>

                {/* Distribution Matrix (Doughnut) */}
                <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl shadow-blue-900/20 flex flex-col relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50" />
                     <div className="relative z-10 mb-10">
                        <h3 className="text-xl font-black uppercase tracking-tighter leading-none mb-2">Queue Logic</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment State Distribution</p>
                     </div>
                     <div className="flex-1 relative z-10 min-h-[300px]">
                        {loading ? <ChartLoader dark /> : prepareOrdersStatusData() && <Doughnut data={prepareOrdersStatusData()} options={{
                            ...chartOptions,
                            plugins: { ...chartOptions.plugins, legend: { display: true, position: 'bottom', labels: { color: '#94a3b8', font: { size: 9, weight: 'bold' }, usePointStyle: true, padding: 20 } } }
                        }} />}
                     </div>
                     <div className="mt-10 pt-10 border-t border-white/5 relative z-10">
                          <div className="flex items-center gap-4 group/item">
                               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover/item:bg-blue-600 transition-all">
                                    <Globe className="text-blue-400 group-hover/item:text-white" size={20} />
                               </div>
                               <div>
                                    <p className="text-xs font-black uppercase tracking-widest">Global Reach</p>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">14 Countries Managed</p>
                               </div>
                          </div>
                     </div>
                </div>
            </div>

            {/* Final Data Feed */}
            <div className="bg-white rounded-[3.5rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/40 overflow-hidden">
                <div className="px-12 py-10 border-b-2 border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">Kernel Feed</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Latest Transaction Entries</p>
                    </div>
                    <button className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                        Full Ledger
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Node ID</th>
                                <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</th>
                                <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Net Value</th>
                                <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Clearance</th>
                                <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-slate-50">
                            {analytics?.recentOrders?.map((order) => (
                                <tr key={order._id} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="px-12 py-8 font-black text-slate-900 text-xs tabular-nums group-hover:text-blue-600 transition-colors tracking-widest">
                                        #{order._id.substring(18).toUpperCase()}
                                    </td>
                                    <td className="px-12 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-[10px] text-slate-400">
                                                {order.user?.name?.charAt(0) || 'G'}
                                            </div>
                                            <span className="font-black text-slate-900 text-xs uppercase tracking-tight">{order.user?.name || 'Guest'}</span>
                                        </div>
                                    </td>
                                    <td className="px-12 py-8">
                                        <span className="font-black text-slate-900 text-lg tracking-tighter tabular-nums">{formatCurrency(order.totalPrice)}</span>
                                    </td>
                                    <td className="px-12 py-8">
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 ${
                                            order.status === 'Delivered' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                            'bg-blue-50 border-blue-100 text-blue-600'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-12 py-8 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="font-black text-slate-900 text-xs uppercase tracking-widest tabular-nums">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase mt-1">UTC-5 Sync</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, change, icon: Icon, color }) => {
    const isPositive = change.startsWith('+');
    const colors = {
        blue: 'text-blue-600 bg-blue-50 border-blue-100 shadow-blue-100',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-100',
        purple: 'text-purple-600 bg-purple-50 border-purple-100 shadow-purple-100',
        amber: 'text-amber-600 bg-amber-50 border-amber-100 shadow-amber-100',
    };

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                 <Icon size={120} />
            </div>
            <div className="flex justify-between items-start mb-8 relative z-10">
                <div className={`p-4 rounded-2xl shadow-inner ${colors[color]}`}>
                    <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'text-rose-500 bg-rose-50'}`}>
                    {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {change}
                </div>
            </div>
            <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none uppercase">{value}</h3>
            </div>
        </div>
    );
};

const ChartLoader = ({ dark }) => (
    <div className="h-full w-full flex flex-col items-center justify-center space-y-6">
        <Loader2 className={`animate-spin ${dark ? 'text-blue-400' : 'text-blue-600'}`} size={40} />
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Rendering Vector Grid...</p>
    </div>
);

export default AdminAnalytics;
