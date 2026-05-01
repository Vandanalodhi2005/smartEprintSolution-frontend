import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/actions/cartActions";
import SEO from './common/SEO';
import CartTable from "./cart/CartTable";
import CartTotalsCard from "./cart/CartTotalsCard";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems } = cart;
  
  // Filter out corrupted non-object items to prevent crashes
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
      alert("Please log in to proceed to checkout.");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="w-full min-h-screen py-6 sm:py-10 bg-white">
      <SEO title="Shopping Cart" description="Review items in your cart. Secure checkout with free shipping options." canonical="/cart" />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black text-gray-900 mb-6 sm:mb-10 text-center">Shopping Cart</h1>
        {validCartItems.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 xs:p-8 sm:p-12 text-center">
            <p className="text-gray-500 text-base xs:text-lg mb-6">No products in the cart.</p>
            <Link to="/shop" className="inline-block bg-[#EF4056] text-white font-bold px-6 xs:px-8 py-3 rounded-full text-sm xs:text-base uppercase tracking-wider hover:bg-[#d93548] transition-colors">Continue Shopping</Link>
          </div>
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-10">
            <div className="md:col-span-2 order-2 md:order-1">
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
            <div className="order-1 md:order-2 mb-6 md:mb-0">
              <CartTotalsCard subtotal={subtotal} total={subtotal} onCheckout={handleCheckout} />
              <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-6 justify-center md:justify-start">
                <>
                  {/* MasterCard */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 24 24">
                    <rect x="2" y="5" width="20" height="14" rx="2" fill="#000" />
                    <circle cx="10" cy="12" r="3" fill="#EB001B" />
                    <circle cx="14" cy="12" r="3" fill="#F79E1B" />
                  </svg>
                  {/* AMEX */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 24 24">
                    <rect x="2" y="5" width="20" height="14" rx="2" fill="#2E77BB" />
                    <text x="12" y="15" textAnchor="middle" fontSize="4" fill="white">AMEX</text>
                  </svg>
                </>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  🔒 Verified Secure Payment
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
