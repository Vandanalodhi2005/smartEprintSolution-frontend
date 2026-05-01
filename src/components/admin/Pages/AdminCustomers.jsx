import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { useSelector } from 'react-redux';
import {
    Users,
    Search,
    MoreVertical,
    Shield,
    ShieldOff,
    Mail,
    Phone,
    ShoppingBag,
    Trash2,
    X,
    AlertTriangle,
    Loader2,
    CheckCircle2,
    ArrowRight,
    Zap,
    Activity,
    Lock,
    Unlock
} from 'lucide-react';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [confirmModal, setConfirmModal] = useState({ show: false, type: '', userId: null, userName: '' });

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Initial Load & Search
    useEffect(() => {
        if (userInfo) {
            fetchCustomers(debouncedSearchTerm, 1, false);
        }
    }, [userInfo, debouncedSearchTerm]);

    const fetchCustomers = async (keyword = '', pageNumber = 1, append = false) => {
        if (!userInfo) return;

        try {
            setLoading(true);
            setError(null);
            
            const { data: userData } = await api.get(`/auth/users?search=${keyword}&page=${pageNumber}&limit=20`);

            const users = userData.users || [];
            const newPage = userData.page || 1;
            const newPages = userData.pages || 1;

            const { data: orderData } = await api.get(`/orders?limit=1000`);
            const orders = orderData.orders || orderData; 

            const customersWithStats = users.filter(user => !user.isAdmin).map(user => {
                const userOrders = Array.isArray(orders) ? orders.filter(order => order.user && (order.user._id === user._id || order.user === user._id)) : [];
                const totalSpent = userOrders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
                const totalItems = userOrders.reduce((acc, order) =>
                    acc + (order.orderItems ? order.orderItems.reduce((sum, item) => sum + (item.qty || 0), 0) : 0), 0
                );

                return {
                    ...user,
                    totalOrders: userOrders.length,
                    totalSpent: totalSpent,
                    totalItems: totalItems,
                    status: user.isBlocked ? 'Blocked' : 'Active',
                    joinDate: new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                    })
                };
            });

            if (append) {
                setCustomers(prev => [...prev, ...customersWithStats]);
            } else {
                setCustomers(customersWithStats);
            }
            
            setPage(newPage);
            setPages(newPages);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const loadMoreHandler = () => {
        if (page < pages) {
            fetchCustomers(debouncedSearchTerm, page + 1, true);
        }
    };

    const handleDeleteUser = async (userId) => {
        const user = customers.find(c => c._id === userId);
        setConfirmModal({ show: true, type: 'delete', userId, userName: user?.name || 'this user' });
    };

    const handleBlockUser = async (userId) => {
        const user = customers.find(c => c._id === userId);
        setConfirmModal({ show: true, type: 'block', userId, userName: user?.name || 'this user' });
    };

    const handleUnblockUser = async (userId) => {
        const user = customers.find(c => c._id === userId);
        setConfirmModal({ show: true, type: 'unblock', userId, userName: user?.name || 'this user' });
    };

    const handleConfirm = async () => {
        if (!userInfo) return;
        try {
            if (confirmModal.type === 'delete') {
                await api.delete(`/auth/users/${confirmModal.userId}`);
            } else if (confirmModal.type === 'block') {
                await api.put(`/auth/users/${confirmModal.userId}/block`, {});
            } else if (confirmModal.type === 'unblock') {
                await api.put(`/auth/users/${confirmModal.userId}/unblock`, {});
            }
            setConfirmModal({ show: false, type: '', userId: null, userName: '' });
            fetchCustomers(debouncedSearchTerm, 1, false);
        } catch (err) {
            alert(err.response?.data?.message || 'Operation failed');
        }
    };

    return (
        <div className="p-8 sm:p-12 space-y-12 animate-in fade-in duration-700 pb-32">
            {/* Premium Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                             <Users className="text-white" size={16} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Human Capital Registry</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                        Participants<span className="text-blue-600">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm max-w-xl">
                        Monitor participant behavior, manage security clearance, and track cumulative fiscal contributions to the platform.
                    </p>
                </div>
                
                <div className="relative group w-full xl:w-96">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                        type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Identity or Hash..."
                        className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 pl-14 pr-8 text-sm font-bold outline-none focus:border-blue-500 shadow-xl shadow-slate-100/50 transition-all"
                    />
                </div>
            </div>

            {/* Customers Data Matrix */}
            <div className="bg-white border-2 border-slate-50 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
                <div className="bg-slate-50/50 border-b border-slate-100 px-10 py-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200">
                             <Activity size={24} />
                        </div>
                        <div>
                            <span className="font-black text-slate-900 uppercase tracking-widest text-xs block">Population Log</span>
                            <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-1">
                                {customers.length} Nodes Active
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="bg-slate-50/30">
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity Node</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Communication Path</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Activity Count</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Fiscal Impact</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Clearance Status</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Administrative Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading && customers.length === 0 ? (
                                <tr><td colSpan="6" className="py-32 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={40} /></td></tr>
                            ) : error ? (
                                <tr><td colSpan="6" className="py-20 text-center text-rose-500 font-black uppercase tracking-widest text-xs">{error}</td></tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer._id} className="group hover:bg-slate-50/80 transition-all">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-white shadow-lg flex items-center justify-center text-slate-500 font-black text-lg group-hover:rotate-12 transition-transform">
                                                    {(customer.name || 'U').charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-900 text-base uppercase tracking-tight group-hover:text-blue-600 transition-colors">{customer.name || 'Anonymous Node'}</div>
                                                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 italic">UID: {customer._id.substring(18).toUpperCase()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-slate-600">
                                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                                                <Mail size={14} className="text-blue-500" /> {customer.email || 'NO_SIGNAL'}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 text-lg tabular-nums tracking-tighter leading-none">{customer.totalOrders || 0}</span>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Confirmed Deployments</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                             <div className="flex flex-col">
                                                <span className="font-black text-emerald-600 text-xl tabular-nums tracking-tighter leading-none">${(customer.totalSpent || 0).toFixed(2)}</span>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Net Allocation</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            {customer.isBlocked ? (
                                                <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-sm animate-pulse">
                                                    <ShieldOff size={12} className="mr-2" /> Revoked
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm">
                                                    <Shield size={12} className="mr-2" /> Verified
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center gap-3 justify-end opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                                {customer.isBlocked ? (
                                                    <button
                                                        onClick={() => handleUnblockUser(customer._id)}
                                                        className="p-4 rounded-2xl bg-white border-2 border-slate-100 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-xl shadow-slate-100/50"
                                                        title="Restore Access"
                                                    >
                                                        <Unlock size={18} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleBlockUser(customer._id)}
                                                        className="p-4 rounded-2xl bg-white border-2 border-slate-100 text-amber-500 hover:bg-amber-500 hover:text-white transition-all shadow-xl shadow-slate-100/50"
                                                        title="Revoke Access"
                                                    >
                                                        <Lock size={18} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteUser(customer._id)}
                                                    className="p-4 rounded-2xl bg-white border-2 border-slate-100 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-slate-100/50"
                                                    title="Purge Identity"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Population Scaling Matrix */}
                {!loading && page < pages && (
                    <div className="flex justify-center p-12 bg-slate-50/50 border-t border-slate-100">
                        <button 
                            onClick={loadMoreHandler}
                            className="px-12 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-4"
                        >
                            Sync Next Population Cluster <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Terminal Confirmation Modal */}
            {confirmModal.show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300 p-4">
                    <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-2 border-white/20">
                        <div className={`p-12 text-center relative overflow-hidden ${confirmModal.type === 'delete' ? 'bg-rose-500' : confirmModal.type === 'block' ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                            <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl relative z-10">
                                <AlertTriangle size={32} className={confirmModal.type === 'delete' ? 'text-rose-500' : confirmModal.type === 'block' ? 'text-amber-500' : 'text-emerald-500'} />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter relative z-10">
                                {confirmModal.type === 'delete' ? 'PURGE IDENTITY' : confirmModal.type === 'block' ? 'REVOKE ACCESS' : 'RESTORE ACCESS'}
                            </h3>
                            <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mt-2 relative z-10 italic">
                                Action is final and logged in kernel.
                            </p>
                        </div>
                        <div className="p-12 space-y-8">
                            <p className="text-slate-500 font-bold text-center leading-relaxed">
                                Are you certain you wish to execute the <span className="text-slate-900 font-black uppercase">{confirmModal.type}</span> protocol on participant <span className="text-blue-600 font-black uppercase">{confirmModal.userName}</span>?
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setConfirmModal({ show: false, type: '', userId: null, userName: '' })}
                                    className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all"
                                >
                                    Abort
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className={`flex-1 py-5 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl ${confirmModal.type === 'delete' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' : confirmModal.type === 'block' ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'}`}
                                >
                                    Execute
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCustomers;
