import React from "react";

const CartTable = ({ cartItems = [], onQtyChange, onRemove, onApplyCoupon, onUpdateCart }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded border border-gray-200 mb-8 sm:mb-10">
      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-base">
          <thead className="bg-white border-b border-gray-200">
            <tr className="text-gray-900 font-bold">
              <th className="py-4 px-6">Product</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Quantity</th>
              <th className="py-4 px-6">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-gray-400 text-lg">No products in the cart.</td>
              </tr>
            ) : (
              cartItems.filter(i => i && typeof i === 'object').map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-6 px-6 flex items-center gap-4">
                    <button onClick={() => onRemove(item.id)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 text-gray-400 mr-2">
                      &times;
                    </button>
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
                    <span className="font-medium text-gray-900 text-base">{item.name}</span>
                  </td>
                  <td className="py-6 px-6 font-medium text-gray-900">${(item.price || 0).toFixed(2)}</td>
                  <td className="py-6 px-6">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button onClick={() => onQtyChange(item.id, item.qty - 1)} className="w-8 h-8 text-lg font-bold text-gray-700 hover:bg-gray-100">-</button>
                      <span className="w-10 text-center text-gray-900 font-medium">{item.qty}</span>
                      <button onClick={() => onQtyChange(item.id, item.qty + 1)} className="w-8 h-8 text-lg font-bold text-gray-700 hover:bg-gray-100">+</button>
                    </div>
                  </td>
                  <td className="py-6 px-6 font-medium text-gray-900">${(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card/List for mobile */}
      <div className="block md:hidden">
        {cartItems.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-base">No products in the cart.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {[...cartItems].reverse().map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border-b last:border-b-0">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded bg-gray-50 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-900 text-base line-clamp-2 pr-2">{item.name}</span>
                    <button onClick={() => onRemove(item.id)} className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 text-gray-400 ml-2 text-lg">&times;</button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-700 font-medium text-sm">${item.price.toFixed(2)}</span>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button onClick={() => onQtyChange(item.id, item.qty - 1)} className="w-7 h-7 text-base font-bold text-gray-700 hover:bg-gray-100">-</button>
                      <span className="w-8 text-center text-gray-900 font-medium text-sm">{item.qty}</span>
                      <button onClick={() => onQtyChange(item.id, item.qty + 1)} className="w-7 h-7 text-base font-bold text-gray-700 hover:bg-gray-100">+</button>
                    </div>
                    <span className="text-gray-900 font-semibold text-sm">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coupon and Update Row */}
      <div className="flex flex-col xs:flex-row items-center justify-between gap-3 xs:gap-4 border-t border-gray-200 p-3 xs:p-4 bg-white">
        <div className="flex gap-2 w-full xs:w-auto">
          <input type="text" placeholder="Coupon code" className="border border-gray-300 rounded px-3 xs:px-4 py-2 text-sm xs:text-base focus:outline-none w-full xs:w-auto" />
          <button onClick={onApplyCoupon} className="bg-[#EF4056] text-white font-bold px-5 xs:px-7 py-2 rounded-full text-sm xs:text-base hover:bg-[#d93548] transition-colors">APPLY COUPON</button>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
