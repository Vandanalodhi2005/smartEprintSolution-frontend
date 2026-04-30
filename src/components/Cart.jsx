import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/actions/cartActions";
import SEO from './common/SEO';
import CartTable from "./cart/CartTable";
import CartTotalsCard from "./cart/CartTotalsCard";
import { ShoppingBag, ArrowRight } from "lucide-react";

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
  
  const handleApplyCoupon = () => {
      // Mock for now
  };
  
  const handleCheckout = () => {
    if (!userInfo || !userInfo.token) {
      navigate('/?auth=login'); // Handle this via state or redirect
      return;
    }
    navigate('/checkout/');
  };

  return (
    <div className="min-h-screen bg-white py-16 sm:py-24">
      <SEO title="Shopping Cart | Smart ePrint Solution" description="Review items in your cart. Secure checkout with free shipping options." canonical="/cart" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-16 text-center lg:text-left">
           <h1 className="text-4xl sm:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">Cart Logistics</h1>
           <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Hardware & Components Deployment Queue</p>
        </div>

        {validCartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[3rem] border-2 border-slate-100 shadow-inner">
            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-sm">
               <ShoppingBag className="text-[#EF4056]" size={40} />
            </div>
            <p className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8">Your deployment queue is empty.</p>
            <Link to="/shop/" className="px-10 py-5 bg-[#EF4056] text-white font-black rounded-[1.5rem] text-xs uppercase tracking-[0.2em] hover:bg-rose-600 transition-all flex items-center gap-3">
               Explore Hardware <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-20">
            <div className="lg:col-span-2">
              <CartTable
                cartItems={validCartItems.map(item => ({
                  id: item.product,
                  image: item.image,
                  name: item.title,
                  price: item.price,
                  qty: item.qty
                }))}
                onQtyChange={handleQtyChange}
                onRemove={handleRemove}
                onApplyCoupon={handleApplyCoupon}
              />
            </div>
            <div className="lg:sticky lg:top-32 h-fit">
              <CartTotalsCard subtotal={subtotal} total={subtotal} onCheckout={handleCheckout} />
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
