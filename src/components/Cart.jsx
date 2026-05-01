import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/actions/cartActions";
import SEO from './common/SEO';
import CartTable from "./cart/CartTable";
import CartTotalsCard from "./cart/CartTotalsCard";
import { ShoppingCart, ShieldCheck, Zap, ArrowLeft, Layers } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems } = cart;
  
  const validCartItems = (cartItems || []).filter(item => item && typeof item === 'object' && item.product);
  const subtotal = validCartItems.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 0), 0);

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(addToCart(id, qty));
  };
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleApplyCoupon = () => {};
  const handleUpdateCart = () => {};
  const handleCheckout = () => {
    if (!userInfo || !userInfo.token) {
      alert("Please login to proceed to checkout.");
      return;
    }
    navigate('/checkout/');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-20">
      <SEO 
        title="Shopping Cart | Smart ePrint Solution" 
        description="Review the items in your shopping cart. Secure checkout with guaranteed protection." 
        canonical="/cart/" 
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Module */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-rose-600 text-[10px] font-black uppercase tracking-[0.4em]">
                <Layers size={14} />
                Your Items
             </div>
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
               Shopping <span className="text-slate-400 text-3xl md:text-5xl block md:inline">Cart.</span>
             </h1>
          </div>
          <Link to="/shop/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-600 transition-colors pb-1">
             <ArrowLeft size={14} /> Back to Shop
          </Link>
        </div>

        {validCartItems.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-[3rem] p-16 md:p-32 text-center shadow-xl shadow-slate-200/20 animate-fade-in-up">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-8">
               <ShoppingCart size={40} />
            </div>
            <p className="text-slate-400 font-black uppercase text-xs tracking-[0.3em] mb-10">Your cart is empty</p>
            <Link to="/shop/" className="inline-block bg-slate-900 text-white font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl">Browse Products</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 animate-fade-in-up">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                <CartTable
                  cartItems={cartItems.map(item => ({
                    id: item.product,
                    image: item.image,
                    name: item.title,
                    price: item.price,
                    qty: item.qty
                  }))}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                  onApplyCoupon={handleApplyCoupon}
                  onUpdateCart={handleUpdateCart}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20">
                <CartTotalsCard subtotal={subtotal} total={subtotal} onCheckout={handleCheckout} />
                
                <div className="mt-10 pt-8 border-t border-slate-50">
                   <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <ShieldCheck size={18} className="text-rose-600" />
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Encrypted Checkout Active</span>
                   </div>
                   
                   <div className="flex items-center gap-4 mt-6 px-2 justify-center opacity-40 grayscale">
                      <img src="https://img.icons8.com/color/32/paypal.png" alt="PayPal" />
                      <img src="https://img.icons8.com/color/32/visa.png" alt="Visa" />
                      <img src="https://img.icons8.com/color/32/mastercard.png" alt="Mastercard" />
                      <img src="https://img.icons8.com/color/32/amex.png" alt="Amex" />
                   </div>
                </div>
              </div>

              {/* Technical Support Module */}
              <div className="p-8 bg-rose-600 rounded-[2.5rem] text-white shadow-2xl shadow-rose-200">
                 <Zap size={24} className="mb-4 fill-current" />
                 <h4 className="text-lg font-black uppercase tracking-tight mb-2">Fast Shipping</h4>
                 <p className="text-rose-100 text-xs font-medium leading-relaxed opacity-90">
                    Your items are being prepared for quick delivery and expert support.
                 </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
