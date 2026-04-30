import React, { useState } from 'react';
import api from '../../lib/api';


const TrackOrder = () => {
    const [orderId, setOrderId] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrack = async (e) => {
        e.preventDefault();
        const cleanId = orderId.replace('ORD-', '').trim();
        if (!cleanId) {
            alert("Please enter an Order ID");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get(`/orders/${cleanId}`);
            
            // Format order data for tracking display
            const formattedOrder = {
                customerName: `${data.user?.firstName} ${data.user?.lastName}` || "Customer",
                orderId: `ORD-${data._id.substring(18).toUpperCase()}`,
                paid: data.isPaid,
                status: data.status,
                currentLocation: data.tracking?.currentLocation || "Warehouse",
                products: data.orderItems.map(item => ({
                    name: item.name,
                    image: item.image,
                    quantity: item.qty,
                    price: item.price
                })),
                history: [
                    { status: data.isPaid ? 'Confirmed' : 'Payment Failed', location: 'Office', date: new Date(data.createdAt).toLocaleDateString() },
                    { status: data.status, location: data.tracking?.currentLocation || 'In Transit', date: 'Real-time' }
                ]
            };
            
            setOrderDetails(formattedOrder);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Order not found. Please check the ID.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20 py-8 sm:py-10 lg:py-12 pb-24">
            {/* Background Patterns */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-200/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-red-200/10 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <div className="mb-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#EF4056] mb-2 uppercase tracking-tighter text-left">Track Your Order</h1>
                    <div className="h-1 w-20 bg-[#EF4056] rounded-full"></div>
                </div>

                {/* Input */}
                <form
                    onSubmit={handleTrack}
                    className="flex flex-col sm:flex-row gap-3 mb-8"
                >
                    <input
                        type="text"
                        placeholder="Enter your Order ID (e.g. ORD-XXXX)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="flex-grow px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EF4056] focus:border-transparent transition-all font-medium placeholder:text-slate-400"
                    />
                    <button className="px-8 py-4 bg-[#EF4056] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-lg hover:shadow-red-200/50 transition-all active:scale-95 hover:bg-[#d93548]">
                        Track
                    </button>
                </form>

                {error && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 text-red-600 rounded-2xl font-bold text-center mb-8">
                        {error}
                    </div>
                )}

                {/* Order Details */}
                {orderDetails && (
                    <div className="bg-gradient-to-br from-white to-red-50/30 shadow-lg shadow-red-100/30 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-slate-100 space-y-6 sm:space-y-8 backdrop-blur-sm">
                        {/* Order Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-left">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Order ID</p>
                                    <p className="font-black text-sm text-slate-900">{orderDetails.orderId}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-left">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Customer</p>
                                    <p className="font-bold text-slate-900">{orderDetails.customerName}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className={`p-4 rounded-xl border-2 text-left ${
                                    orderDetails.paid 
                                    ? 'bg-emerald-50 border-emerald-200' 
                                    : 'bg-rose-50 border-rose-200'
                                }`}>
                                    <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{color: orderDetails.paid ? '#059669' : '#EF4056'}}>
                                        Payment Status
                                    </p>
                                    <p className="font-black text-sm" style={{color: orderDetails.paid ? '#059669' : '#EF4056'}}>
                                        {orderDetails.paid ? "✓ Paid" : "Failed - Please Reorder"}
                                    </p>
                                </div>
                                <div className={`p-4 rounded-xl border-2 text-left ${
                                    orderDetails.paid 
                                    ? 'bg-rose-50 border-rose-100' 
                                    : 'bg-rose-50 border-rose-200'
                                }`}>
                                    <p className="text-[9px] font-black uppercase tracking-widest mb-1 text-[#EF4056]">
                                        Current Status
                                    </p>
                                    <p className="font-bold text-sm text-[#EF4056]">
                                        {orderDetails.paid ? orderDetails.status : "❌ Order Cancelled"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="text-left">
                            <h2 className="text-xl sm:text-2xl font-black text-[#EF4056] mb-6 uppercase tracking-tighter">Products</h2>
                            <div className="space-y-3">
                                {orderDetails.products.map((prod, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row items-center gap-4 bg-white hover:from-rose-50/50 hover:to-rose-50/50 p-4 rounded-2xl border-2 border-slate-100 transition-all hover:border-rose-200"
                                    >
                                        <div className="w-24 h-24 bg-white border-2 border-slate-200 rounded-2xl p-2 flex items-center justify-center shrink-0 hover:shadow-lg transition-all">
                                            <img
                                                src={prod.image}
                                                alt={prod.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <p className="font-black text-slate-900 uppercase tracking-tight text-sm">{prod.name}</p>
                                            <p className="text-slate-500 text-[11px] font-bold">
                                                Quantity: {prod.quantity}
                                            </p>
                                        </div>
                                        <p className="font-black text-2xl text-[#EF4056]">${prod.price.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="text-left">
                            <h2 className="text-xl sm:text-2xl font-black text-[#EF4056] mb-8 uppercase tracking-tighter">Tracking History</h2>
                            <div className="relative pl-8">
                                {/* Timeline Line */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-100 rounded-full"></div>
                                
                                <ul className="space-y-8">
                                    {orderDetails.history.map((step, idx) => {
                                        // For failed payments, only show first item (Payment Failed at Office)
                                        if (!orderDetails.paid && idx > 0) return null;
                                        
                                        const isCompleted = idx < orderDetails.history.length - 1;
                                        const isCurrent = idx === orderDetails.history.length - 1;
                                        const isFailure = step.status.includes('Failed');

                                        return (
                                            <li key={idx} className="relative">
                                                {/* Dot */}
                                                <div className="absolute -left-5 top-0 w-8 h-8 rounded-full border-4 flex items-center justify-center" style={{
                                                    backgroundColor: isFailure ? '#EF4056' : isCurrent ? '#EF4056' : '#10B981',
                                                    borderColor: isFailure ? '#EF4056' : isCurrent ? '#EF4056' : '#10B981'
                                                }}>
                                                    {isCompleted && !isFailure && (
                                                        <svg
                                                            className="w-4 h-4 text-white"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={3}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    )}
                                                    {isFailure && (
                                                        <svg
                                                            className="w-4 h-4 text-white"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={3}
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className={`rounded-2xl border-2 p-4 transition-all ${
                                                    isFailure 
                                                    ? 'bg-rose-50 border-rose-200' 
                                                    : 'bg-white border-slate-100 hover:border-rose-200'
                                                }`}>
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                                        <p className="font-black text-sm uppercase tracking-tight" style={{color: isFailure ? '#EF4056' : isCurrent ? '#EF4056' : '#059669'}}>
                                                            {step.status}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{step.date}</p>
                                                    </div>
                                                    <p className="text-slate-600 font-semibold text-xs mt-2">{step.location}</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
