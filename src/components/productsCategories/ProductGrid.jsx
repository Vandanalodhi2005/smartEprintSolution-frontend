import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { useImagePreload } from "../../lib/ImagePreloadContext";
import ProductImage from "../common/ProductImage";
import { Layers, ChevronRight, Zap, Activity } from "lucide-react";

const ProductGrid = ({ heading = "Products Inventory", products = [], enableFlowLayout = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getImageUrl } = useImagePreload();

    return (
        <div className={`max-w-7xl mx-auto px-6 py-12 lg:py-24 ${enableFlowLayout ? '' : ''}`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-rose-600 text-[10px] font-black">
                     <Layers size={14} />
                     Products Catalog
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                    Products <br />
                    <span className="text-slate-400">Inventory.</span>
                  </h2>
               </div>
               <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                     <p className="text-[10px] font-black text-slate-400">Global Availability</p>
                     <p className="text-xs font-bold text-slate-900">Protocol Verified</p>
                  </div>
               </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {products.map((product, index) => {
                    const inStock = product.countInStock > 0;
                    return (
                        <Link
                            key={product._id || product.slug}
                            to={`/product/${product.slug || product._id}/`}
                            className="group flex flex-col bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden hover:shadow-2xl hover:shadow-rose-100/50 transition-all duration-500 animate-fade-in-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Asset Visualization */}
                            <div className="relative bg-slate-50/50 w-full aspect-square overflow-hidden flex items-center justify-center p-12">
                                <ProductImage
                                    src={getImageUrl(product) || '/printer-without-bg.png'}
                                    alt={product.title}
                                    width="400"
                                    height="400"
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-10"
                                />

                                {/* Operational Status Badge */}
                                <div className="absolute top-6 left-6 z-20">
                                   {inStock ? (
                                      <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full border border-slate-100">
                                         <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                         <span className="text-[8px] font-black text-slate-900">Ready</span>
                                      </div>
                                   ) : (
                                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700">
                                         <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                         <span className="text-[8px] font-black text-white">Depleted</span>
                                      </div>
                                   )}
                                </div>
                                
                                {/* Abstract Detail */}
                                <div className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                                   <Zap size={16} className="text-slate-400" />
                                </div>
                            </div>

                            {/* Asset Meta */}
                            <div className="p-10 space-y-6 flex-1 flex flex-col">
                                <div className="space-y-2">
                                   <p className="text-[10px] font-black text-rose-600">
                                      {typeof product.category === 'object' ? product.category.name : product.category}
                                   </p>
                                   <h3 className="text-xl font-black text-slate-900 tracking-tight line-clamp-2 leading-tight group-hover:text-rose-600 transition-colors">
                                       {product.title}
                                   </h3>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div className="flex flex-col">
                                       <span className="text-[9px] font-black text-slate-400 mb-1">Valuation</span>
                                       <span className="text-2xl font-black text-slate-900 tracking-tighter">
                                           ${product.price?.toFixed(2) || '0.00'}
                                       </span>
                                    </div>
                                    
                                    <div className="w-12 h-12 bg-slate-50 group-hover:bg-rose-600 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-white transition-all duration-500 shadow-lg shadow-slate-100 group-hover:shadow-rose-200">
                                       <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductGrid;
