import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { saveShippingAddress } from '../redux/actions/cartActions';
import api from '../lib/api';
import { Loader2, ShieldCheck, Truck, CreditCard, ChevronRight, Lock, Activity, Zap, Layers } from 'lucide-react';
import SEO from './common/SEO';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [province, setProvince] = useState(shippingAddress.state || '');
    const [phone, setPhone] = useState(shippingAddress.phone || '');

    const [step, setStep] = useState(1);
    const [shippingRates, setShippingRates] = useState([]);
    const [distance, setDistance] = useState(null);
    const [selectedRate, setSelectedRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clover, setClover] = useState(null);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    useEffect(() => {
        const mountCloverElements = () => {
            setTimeout(() => {
                const numberEl = document.querySelector('#card-number');
                if (numberEl && !numberEl.hasChildNodes()) {
                    const cloverInstance = new window.Clover(import.meta.env.VITE_CLOVER_PUBLIC_KEY);
                    const elements = cloverInstance.elements();

                    const styles = {
                        body: {
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: '#0f172a', // slate-900
                            fontWeight: '600',
                        },
                        'input::placeholder': {
                            color: '#94a3b8' // slate-400
                        }
                    };

                    elements.create('CARD_NUMBER', { styles }).mount('#card-number');
                    elements.create('CARD_DATE', { styles }).mount('#card-date');
                    elements.create('CARD_CVV', { styles }).mount('#card-cvv');
                    elements.create('CARD_POSTAL_CODE', { styles }).mount('#card-postal-code');

                    setClover(cloverInstance);
                }
            }, 100);
        };

        if (!userInfo || cartItems.length === 0) {
            navigate('/cart/');
        } else if (step === 2) {
            if (window.Clover) {
                mountCloverElements();
                return;
            }

            let script = document.getElementById('clover-sdk');
            if (!script) {
                script = document.createElement('script');
                script.id = 'clover-sdk';
                script.src = 'https://checkout.clover.com/sdk.js';
                script.defer = true;
                document.body.appendChild(script);
            }

            script.addEventListener('load', mountCloverElements, { once: true });
        }
    }, [userInfo, cartItems, navigate, step]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxPrice = 0;
    const shippingPrice = selectedRate ? Number(selectedRate.rate) : 0;
    const totalPrice = subtotal + taxPrice + shippingPrice;

    const submitShippingHandler = async (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country, state: province, phone }));

        if (shippingRates.length === 0) {
            try {
                setLoading(true);
                const { data } = await api.post(
                    `/shipping/rates`,
                    { address, city, postalCode, country, state: province, phone, cartItems }
                );
                
                const rates = data.rates || (Array.isArray(data) ? data : []);
                setDistance(data.distance || null);

                const uniqueMap = {};
                rates.forEach(rate => {
                    const key = `${rate.carrier}_${rate.service}`;
                    if (!uniqueMap[key] || Number(rate.rate) < Number(uniqueMap[key].rate)) {
                        uniqueMap[key] = rate;
                    }
                });
                const bestRates = Object.values(uniqueMap)
                    .sort((a, b) => Number(a.rate) - Number(b.rate))
                    .slice(0, 4);
                setShippingRates(bestRates);
                if (bestRates.length > 0) setSelectedRate(bestRates[0]);
            } catch (error) {
                alert(error.response?.data?.message || 'Error calculating shipping');
            } finally {
                setLoading(false);
            }
        } else {
            if (!selectedRate) {
                alert('Please select a shipping method');
                return;
            }
            setStep(2);
        }
    };

    const initPayment = async () => {
        try {
            setLoading(true);
            if (!clover) {
                alert('Authentication node not ready');
                setLoading(false);
                return;
            }

            const result = await clover.createToken();
            if (result.errors) {
                 alert('Error: ' + Object.values(result.errors).join(', '));
                 setLoading(false);
                 return;
            }

            const orderData = {
                orderItems: cartItems,
                shippingAddress: { 
                    address, city, postalCode, country, phone, state: province,
                    shippingMethod: selectedRate ? `${selectedRate.carrier} ${selectedRate.service}` : ''
                },
                paymentMethod: 'Clover',
                itemsPrice: subtotal,
                taxPrice,
                shippingPrice,
                totalPrice,
            };

            const { data: createdOrder } = await api.post(`/orders`, orderData);

            await api.post(
                `/orders/clover/pay`,
                { amount: totalPrice, orderId: createdOrder._id, source: result.token }
            );

            navigate('/profile/');
        } catch (error) {
            alert(error.response?.data?.message || 'Payment Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-20">
            <SEO title="Secure Checkout | Smart ePrint Solution" description="Complete your purchase securely through our encrypted checkout." canonical="/checkout/" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                
                {/* Protocol Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-rose-600 text-[10px] font-black uppercase tracking-[0.4em]">
                         <Layers size={14} />
                         Order Details
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Secure <span className="text-slate-400">Checkout.</span>
                      </h1>
                   </div>
                   
                   {/* Progress Visualizer */}
                   <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/20">
                      {[1, 2].map((s) => (
                         <React.Fragment key={s}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                               step === s ? 'bg-rose-600 text-white shadow-lg shadow-rose-100' : 
                               step > s ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-300'
                            }`}>
                               {s}
                            </div>
                            {s === 1 && <div className={`w-8 h-1 rounded-full ${step > 1 ? 'bg-slate-900' : 'bg-slate-100'}`} />}
                         </React.Fragment>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3">
                        {step === 1 ? (
                            <form onSubmit={submitShippingHandler} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/20 animate-fade-in-up">
                                <div className="flex items-center gap-4 mb-10">
                                   <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                                      <Truck size={24} />
                                   </div>
                                   <div>
                                      <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Shipping Info</h2>
                                      <p className="text-xs font-black text-rose-600 uppercase tracking-widest">Step 01: Address</p>
                                   </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
                                        <input 
                                            value={address} 
                                            onChange={(e) => setAddress(e.target.value)} 
                                            required 
                                            placeholder="STREET ADDRESS" 
                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-600 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-200" 
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                                            <input value={city} onChange={(e) => setCity(e.target.value)} required placeholder="CITY" className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-600 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-200" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">State / Province</label>
                                            <input value={province} onChange={(e) => setProvince(e.target.value)} required placeholder="STATE" className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-600 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-200" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Zip / Postal Code</label>
                                            <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required placeholder="ZIP" className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-600 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-200" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Country</label>
                                            <select value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-600 outline-none transition-all font-bold text-slate-900 appearance-none">
                                                <option value="" disabled>SELECT COUNTRY</option>
                                                <option value="US">UNITED STATES</option>
                                                <option value="CA">CANADA</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                            <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="PHONE NUMBER" className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-600 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-200" />
                                        </div>
                                    </div>
                                </div>

                                {shippingRates.length > 0 && (
                                    <div className="mt-12 space-y-6">
                                        <div className="flex items-center gap-2">
                                           <Activity size={16} className="text-rose-600" />
                                           <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Select Shipping Method</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            {shippingRates.map((rate) => (
                                                <button 
                                                    type="button"
                                                    key={rate.id}
                                                    onClick={() => setSelectedRate(rate)}
                                                    className={`p-6 rounded-[2rem] border-2 text-left transition-all relative overflow-hidden group ${
                                                        selectedRate?.id === rate.id 
                                                            ? 'border-rose-600 bg-rose-50/30' 
                                                            : 'border-slate-50 bg-slate-50/50 hover:border-slate-200'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-center relative z-10">
                                                        <div>
                                                            <p className="font-black text-slate-900 uppercase tracking-tight">{rate.service}</p>
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{rate.carrier} • Verified</p>
                                                        </div>
                                                        <p className="text-xl font-black text-slate-900">${Number(rate.rate).toFixed(2)}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button type="submit" disabled={loading} className="w-full mt-12 bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] hover:bg-black transition-all shadow-2xl active:scale-95 disabled:opacity-50">
                                    {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : (shippingRates.length > 0 ? "Continue to Payment" : "Calculate Shipping")}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/20 animate-fade-in-up">
                                <div className="flex items-center justify-between mb-10">
                                   <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                                         <ShieldCheck size={24} />
                                      </div>
                                      <div>
                                         <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Payment Details</h2>
                                         <p className="text-xs font-black text-rose-600 uppercase tracking-widest">Step 02: Secure Payment</p>
                                      </div>
                                   </div>
                                   <button onClick={() => setStep(1)} className="text-[10px] font-black text-slate-400 hover:text-rose-600 uppercase tracking-widest border-b-2 border-transparent hover:border-rose-600 transition-all">Change Shipping</button>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Information</label>
                                        <div className="grid grid-cols-1 gap-6">
                                           <div className="space-y-2">
                                              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">Card Number</p>
                                              <div className="px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus-within:bg-white focus-within:border-rose-600 transition-all">
                                                 <div id="card-number" className="h-6"></div>
                                              </div>
                                           </div>
                                           <div className="grid grid-cols-3 gap-4">
                                              <div>
                                                 <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">Expiry</p>
                                                 <div className="px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl"><div id="card-date" className="h-6"></div></div>
                                              </div>
                                              <div>
                                                 <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">CVV</p>
                                                 <div className="px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl"><div id="card-cvv" className="h-6"></div></div>
                                              </div>
                                              <div>
                                                 <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">Zip Code</p>
                                                 <div className="px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl"><div id="card-postal-code" className="h-6"></div></div>
                                              </div>
                                           </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-2xl text-slate-400">
                                       <Lock size={14} className="text-rose-600" />
                                       <span className="text-[10px] font-black uppercase tracking-widest">Secure 256-bit Connection Active</span>
                                    </div>

                                    <div className="p-6 bg-rose-50/50 border border-rose-100 rounded-3xl">
                                        <label className="flex items-start gap-4 cursor-pointer group">
                                            <input type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} className="w-5 h-5 mt-1 accent-rose-600" />
                                            <span className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight">
                                                I confirm my order and agree to the <Link to="/terms-and-conditions/" className="text-rose-600 underline">Terms of Service</Link> and <Link to="/privacy-policy/" className="text-rose-600 underline">Privacy Policy</Link>.
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <button onClick={initPayment} disabled={loading || !agreeToTerms} className="w-full mt-10 bg-rose-600 text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] hover:bg-rose-500 transition-all shadow-2xl shadow-rose-200 active:scale-95 disabled:opacity-50">
                                    {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Place Order"}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 h-fit">
                           <div className="flex items-center gap-3 mb-10">
                              <Zap size={20} className="text-rose-600 fill-current" />
                              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Order Summary</h3>
                           </div>
                           
                           <div className="space-y-4">
                              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                                 <span>Subtotal</span>
                                 <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                                 <span>Shipping</span>
                                 <span className="text-slate-900">${shippingPrice.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                                 <span>Tax</span>
                                 <span className="text-slate-900">${taxPrice.toFixed(2)}</span>
                              </div>
                              <div className="my-6 h-[2px] bg-slate-50" />
                              <div className="flex justify-between items-end">
                                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600">Total Amount</span>
                                 <span className="text-4xl font-black text-slate-900 tracking-tighter">${totalPrice.toFixed(2)}</span>
                              </div>
                           </div>
                           
                           <div className="mt-12 p-6 bg-slate-900 rounded-[2rem] text-white">
                              <div className="flex items-center gap-2 mb-2">
                                 <ShieldCheck size={14} className="text-rose-500" />
                                 <span className="text-[9px] font-black uppercase tracking-widest">PCI-DSS Verified Node</span>
                              </div>
                              <p className="text-[10px] font-medium text-slate-400 leading-relaxed">
                                 All payment artifacts are processed through the Clover Secure Layer. No financial data is persisted on local nodes.
                              </p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
