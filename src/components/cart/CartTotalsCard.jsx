import React from "react";

const CartTotalsCard = ({ subtotal = 0, total = 0, onCheckout }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded border border-gray-200 p-5 xs:p-6 sm:p-8">
      <h2 className="text-2xl xs:text-3xl font-black text-gray-900 mb-6 sm:mb-8">Cart totals</h2>
      <div className="divide-y divide-gray-200">
        <div className="flex justify-between py-4 text-lg">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-4 text-lg">
          <span className="text-gray-700">Total</span>
          <span className="text-gray-900 font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={onCheckout}
        className="w-full mt-6 sm:mt-8 bg-[#EF4056] text-white font-bold py-3 sm:py-4 rounded-full text-base sm:text-lg uppercase tracking-wider hover:bg-[#d93548] transition-colors"
      >
        Proceed to checkout
      </button>
    </div>
  );
};

export default CartTotalsCard;
