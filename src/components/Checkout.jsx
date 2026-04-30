import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/actions/cartActions';
import { createOrder } from '../redux/actions/orderActions';
import { Loader2, ShieldCheck, Truck, Package, ChevronRight, MapPin, Phone, User } from 'lucide-react';
import SEO from './common/SEO';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error, loading: orderLoading } = orderCreate;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || 'US');
    const [province, setProvince] = useState(shippingAddress.state || '');
    const [phone, setPhone] = useState(shippingAddress.phone || '');
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    useEffect(() => {
        if (!userInfo) {
            navigate('/?auth=login');
        }
        if (success) {
            navigate(`/profile`); // Or to an order success page
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [userInfo, navigate, success, dispatch]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalPrice = subtotal;

    const placeOrderHandler = (e) => {
        e.preventDefault();
        if (!agreeToTerms) {
            alert('Please agree to the Terms and Conditions');
            return;
        }

        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: { address, city, postalCode, country, state: province, phone },
            totalPrice,
        }));
    };

    return (
        <div className="min-h-screen bg-white py-16 sm:py-24">
            <SEO title="Confirm Deployment | Smart ePrint Solution" description="Finalize your hardware deployment request." />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-16 text-center lg:text-left">
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">Deployment Protocol</h1>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Hardware Logistics & Final Confirmation</p>
                </div>

                <form onSubmit={placeOrderHandler} className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
                    {/* LEFT: FORM */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-8">
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                                <div className="p-3 bg-slate-900 text-white rounded-2xl"><MapPin size={20} /></div>
                                Delivery Coordinates
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
                                    <input 
                                        value={address} onChange={(e) => setAddress(e.target.value)} required 
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-[#EF4056] outline-none transition-all font-bold text-slate-900" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                                    <input value={city} onChange={(e) => setCity(e.target.value)} required className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-[#EF4056] outline-none transition-all font-bold text-slate-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">State / Province</label>
                                    <input value={province} onChange={(e) => setProvince(e.target.value)} required className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-[#EF4056] outline-none transition-all font-bold text-slate-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Postal Code</label>
                                    <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-[#EF4056] outline-none transition-all font-bold text-slate-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Contact</label>
                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-[#EF4056] outline-none transition-all font-bold text-slate-900" />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100">
                             <label className="flex items-start gap-4 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="w-6 h-6 mt-1 accent-[#EF4056] rounded-xl"
                                />
                                <span className="text-xs font-bold text-slate-500 uppercase leading-loose group-hover:text-slate-900 transition-colors">
                                    I confirm that the coordinates provided are accurate and I agree to the <a href="/terms-and-conditions" target="_blank" className="text-[#EF4056] underline">Terms of Hardware Deployment</a>.
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* RIGHT: SUMMARY */}
                    <div className="lg:col-span-5">
                        <div className="bg-slate-900 text-white p-10 sm:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 sticky top-32">
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-10 text-[#EF4056]">Deployment Manifest</h3>
                            
                            <div className="space-y-6 mb-12 max-h-60 overflow-y-auto pr-4 custom-scrollbar">
                                {cartItems.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-xl p-1 flex-shrink-0">
                                                <img src={item.image} alt="" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-black uppercase tracking-tight truncate">{item.title}</p>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.qty} Unit(s)</p>
                                            </div>
                                        </div>
                                        <span className="font-black text-sm tracking-tighter">${(item.price * item.qty).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-white/10 pt-8 mb-10">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Subtotal</span>
                                    <span className="text-xl font-black tracking-tighter">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Shipping Fees</span>
                                    <span className="text-[9px] font-black uppercase px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full tracking-widest">Included</span>
                                </div>
                                <div className="flex justify-between items-baseline pt-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#EF4056]">Grand Total</span>
                                    <span className="text-4xl font-black tracking-tighter">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={orderLoading || cartItems.length === 0}
                                className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#EF4056] hover:text-white transition-all flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-50"
                            >
                                {orderLoading ? <Loader2 className="animate-spin" size={18} /> : <>Initiate Deployment <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" /></>}
                            </button>
                            
                            {error && <p className="mt-6 text-[10px] font-black uppercase text-rose-500 text-center tracking-widest bg-rose-500/10 py-3 rounded-xl">{error}</p>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
