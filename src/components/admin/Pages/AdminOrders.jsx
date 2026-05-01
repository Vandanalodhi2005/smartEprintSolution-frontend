import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { useSelector } from 'react-redux';
import {
    Search,
    ShoppingBag,
    MoreHorizontal,
    MapPin,
    Clock,
    Truck,
    CheckCircle,
    AlertCircle,
    X,
    User,
    CreditCard,
    DollarSign,
    Package,
    ArrowRight,
    Loader2,
    Calendar,
    ChevronDown,
    Filter,
    Shield
} from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const fetchOrders = async (keyword = '', pageNumber = 1, append = false) => {
        try {
            setLoading(true);
            const { data } = await api.get(`/orders?search=${keyword}&page=${pageNumber}&limit=20`);
            
            const newOrders = data.orders || data; 
            const newPage = data.page || 1;
            const newPages = data.pages || 1;

            if (append) {
                setOrders(prev => [...prev, ...newOrders]);
            } else {
                setOrders(newOrders);
            }
            
            setPage(newPage);
            setPages(newPages);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userInfo) {
            fetchOrders(debouncedSearchTerm, 1, false);
        }
    }, [userInfo, debouncedSearchTerm]);

    const loadMoreHandler = () => {
        if (page < pages) {
            const nextPage = page + 1;
            fetchOrders(debouncedSearchTerm, nextPage, true);
        }
    };

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);

    // Status update state
    const [updateForm, setUpdateForm] = useState({
        status: '',
        currentLocation: '',
        estTime: ''
    });

    const statusColors = {
        'Processing': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        'Shipped': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
        'Out for Delivery': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        'Delivered': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        'Cancelled': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    };

    const handleOpenUpdate = (order) => {
        setSelectedOrder(order);
        setUpdateForm({
            status: order.status || 'Processing',
            currentLocation: order.tracking?.currentLocation || 'Distribution Hub',
            estTime: order.tracking?.estTime || '2-4 Days'
        });
        setIsUpdateModalOpen(true);
    };

    const handleOpenItems = (order) => {
        setSelectedOrder(order);
        setIsItemsModalOpen(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/orders/${selectedOrder._id}/status`, updateForm);
            fetchOrders(debouncedSearchTerm, 1, false);
            setIsUpdateModalOpen(false);
        } catch (err) {
            alert(err.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="p-8 sm:p-12 space-y-12 animate-in fade-in duration-700 pb-32">
            {/* Premium Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                             <ShoppingBag className="text-white" size={16} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Fulfillment Engine</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                        Deployments<span className="text-blue-600">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm max-w-xl">
                        Monitor active shipping lanes, verify transaction authenticity, and manage terminal hardware distribution.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
                    <div className="relative group w-full sm:w-96">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input
                            type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Find Order #, Identity or Hash..."
                            className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 pl-14 pr-8 text-sm font-bold outline-none focus:border-blue-500 shadow-xl shadow-slate-100/50 transition-all"
                        />
                    </div>
                    <button className="p-5 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all active:scale-95">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Orders Data Grid */}
            <div className="bg-white border-2 border-slate-50 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
                <div className="bg-slate-50/50 border-b border-slate-100 px-10 py-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200">
                             <Clock size={24} />
                        </div>
                        <div>
                            <span className="font-black text-slate-900 uppercase tracking-widest text-xs block">Active Traffic</span>
                            <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-1">
                                {orders.length} Nodes in View
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1100px]">
                        <thead>
                            <tr className="bg-slate-50/30">
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Registry ID</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Recipient Identity</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Financial Value</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Logistics Status</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Payload</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Access Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading && orders.length === 0 ? (
                                <tr><td colSpan="6" className="py-32 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={40} /></td></tr>
                            ) : error ? (
                                <tr><td colSpan="6" className="py-20 text-center text-rose-500 font-black uppercase tracking-widest text-xs">{error}</td></tr>
                            ) : (
                                <>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="group hover:bg-slate-50/80 transition-all">
                                            <td className="px-10 py-8">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-black text-slate-900 text-xs tabular-nums tracking-widest group-hover:text-blue-600 transition-colors">
                                                        #{order._id.substring(18).toUpperCase()}
                                                    </span>
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                        {order.user?.name?.charAt(0) || 'G'}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-xs uppercase tracking-tight">{order.user?.name || 'Guest Participant'}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold lowercase truncate max-w-[160px]">{order.user?.email || 'unregistered@guest.io'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <p className="font-black text-slate-900 text-xl tracking-tighter leading-none tabular-nums">${(order.totalPrice || 0).toFixed(2)}</p>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">USD NETT</p>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="space-y-3">
                                                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm block w-fit ${statusColors[order.status] || 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                                        {order.status || 'Initial'}
                                                    </span>
                                                    <div className="text-[10px] text-slate-400 flex items-center gap-2 font-bold uppercase tracking-widest">
                                                        <MapPin size={12} className="text-blue-500" />
                                                        <span className="truncate max-w-[120px]">{order.tracking?.currentLocation || 'Distribution'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-center">
                                                <button
                                                    onClick={() => handleOpenItems(order)}
                                                    className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 shadow-xl shadow-slate-100/50 flex items-center justify-center mx-auto transition-all active:scale-90"
                                                >
                                                    <Package size={20} />
                                                </button>
                                                <p className="text-[9px] font-black text-slate-400 mt-2 uppercase tracking-widest">{order.orderItems.reduce((acc, item) => acc + item.qty, 0)} Units</p>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex flex-col gap-2 items-end">
                                                    <button
                                                        onClick={() => handleOpenUpdate(order)}
                                                        className="px-6 py-3 bg-slate-900 text-white hover:bg-blue-600 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 w-40"
                                                    >
                                                        Modify Path
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Matrix */}
                {!loading && page < pages && (
                    <div className="flex justify-center p-12 bg-slate-50/50 border-t border-slate-100">
                        <button 
                            onClick={loadMoreHandler}
                            className="px-12 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-4"
                        >
                            Sync Next Cluster <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Premium Status Modal */}
            {isUpdateModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300 p-4">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="bg-slate-900 px-10 py-10 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent" />
                            <div className="relative z-10">
                                <h3 className="font-black text-white uppercase tracking-[0.2em] text-xs">Route Modulation</h3>
                                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mt-1">Registry: #{selectedOrder._id.substring(18).toUpperCase()}</p>
                            </div>
                            <button onClick={() => setIsUpdateModalOpen(false)} className="text-slate-500 hover:text-white transition-all bg-white/5 p-2 rounded-xl relative z-10">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateSubmit} className="p-12 space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Deployment Status</label>
                                <select
                                    className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-black text-slate-900 uppercase text-xs tracking-widest appearance-none cursor-pointer shadow-inner"
                                    value={updateForm.status}
                                    onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                                >
                                    <option value="Processing">Syncing Log</option>
                                    <option value="Shipped">In Transit</option>
                                    <option value="Out for Delivery">Terminal Delivery</option>
                                    <option value="Delivered">Deployment Success</option>
                                    <option value="Cancelled">Abort Protocol</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Geographic Node</label>
                                <input
                                    type="text" value={updateForm.currentLocation}
                                    onChange={(e) => setUpdateForm({ ...updateForm, currentLocation: e.target.value })}
                                    className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 text-sm"
                                    placeholder="Enter current location..."
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">ETA Projection</label>
                                <input
                                    type="text" value={updateForm.estTime}
                                    onChange={(e) => setUpdateForm({ ...updateForm, estTime: e.target.value })}
                                    className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 text-sm"
                                    placeholder="e.g. 24 - 48 Hours"
                                />
                            </div>
                            <div className="pt-6 flex gap-4">
                                <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="flex-1 py-5 bg-slate-100 text-slate-600 font-black uppercase text-[10px] tracking-widest rounded-2xl">Abort</button>
                                <button type="submit" className="flex-1 py-5 bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-500 transition-all">Execute Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Payload Modal */}
            {isItemsModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-2 border-white/20">
                        <div className="bg-slate-900 px-10 py-10 flex justify-between items-center border-b border-white/10">
                            <div>
                                <h3 className="font-black text-white uppercase tracking-widest text-xs">Payload Manifest</h3>
                                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mt-1">Quantified Units: {selectedOrder.orderItems.length}</p>
                            </div>
                            <button onClick={() => setIsItemsModalOpen(false)} className="text-slate-500 hover:text-white transition-all bg-white/5 p-2 rounded-xl">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-12">
                            <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
                                {selectedOrder.orderItems.map((item, index) => (
                                    <div key={index} className="flex gap-8 items-center p-6 bg-slate-50/50 border-2 border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:shadow-slate-100 hover:border-blue-100 transition-all group">
                                        <div className="w-24 h-24 bg-white border-2 border-slate-50 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                                            <img src={item.image} className="w-full h-full object-contain p-2" alt="" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-black text-slate-900 text-lg tracking-tighter uppercase leading-none mb-3">{item.name}</h4>
                                            <div className="flex justify-between items-center">
                                                <div className="px-3 py-1 bg-slate-900 text-white rounded text-[9px] font-black uppercase tracking-widest">Qty: {item.qty}</div>
                                                <span className="font-black text-slate-900 text-2xl tracking-tighter tabular-nums">${(item.price || 0).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 pt-10 border-t-2 border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                                <div className="text-center sm:text-left">
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Cumulative Weight</span>
                                     <span className="font-black text-slate-900 uppercase text-sm">{selectedOrder.orderItems.reduce((acc, item) => acc + item.qty, 0)} Units Managed</span>
                                </div>
                                <div className="text-center sm:text-right">
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Net Valuation</span>
                                     <span className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums">${(selectedOrder.totalPrice || 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
