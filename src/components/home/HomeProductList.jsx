import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listProducts } from "../../redux/actions/productActions";
import { useImagePreload } from "../../lib/ImagePreloadContext";
import ProductImage from "../common/ProductImage";
import { ArrowRight, Star } from "lucide-react";

const HomeProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getImageUrl } = useImagePreload();

    const { allProducts = [], allLoaded } = useSelector((state) => state.productList);

    useEffect(() => {
        if (!allLoaded) {
            dispatch(listProducts('', '', 1, '', '', '', [], '', '', []));
        }
    }, [dispatch, allLoaded]);

    const displayProducts = allProducts.slice(0, 12).map(product => ({
        ...product,
        link: `/product/${product.slug || product._id}/`
    }));

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-600 text-xs font-black uppercase tracking-[0.3em]">
                        <Star size={14} className="fill-rose-600" />
                        Professional Grade
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                        Solution Curated <span className="text-slate-400">Systems.</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-medium max-w-xl">
                        Hand-selected hardware optimized for the Smart ePrint Ecosystem. Performance guaranteed.
                    </p>
                </div>
                
                <Link
                    to="/shop/"
                    className="group inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-600 transition-all duration-300 shadow-xl"
                >
                    View All Assets
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayProducts.map((product) => {
                    const hasSale = product.oldPrice > 0 && product.oldPrice > product.price;
                    return (
                        <Link
                            key={product._id || product.slug}
                            to={product.link}
                            className="group hover-lift flex flex-col h-full bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all"
                        >
                            {/* Product Visual */}
                            <div className="relative aspect-square mb-6 bg-slate-50 rounded-[2rem] overflow-hidden flex items-center justify-center">
                                {hasSale && (
                                    <span className="absolute top-4 left-4 z-10 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                        Optimization Applied
                                    </span>
                                )}
                                <ProductImage
                                    src={getImageUrl(product) || '/printer-without-bg.png'}
                                    alt={product.title}
                                    className="w-[80%] h-[80%] object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Meta Data */}
                            <div className="flex-1 space-y-3">
                                <div className="text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-1.5">
                                    <div className="w-1 h-1 bg-rose-600 rounded-full"></div>
                                    {typeof product.category === 'object' ? product.category.name : (product.category || 'Standard Asset')}
                                </div>
                                
                                <h3 className="font-bold text-slate-900 text-base leading-tight line-clamp-2 min-h-[3rem]">
                                    {product.title}
                                </h3>

                                {/* Price & CTA Block */}
                                <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                                    <div className="flex flex-col">
                                        {hasSale && (
                                            <span className="text-slate-400 text-[10px] font-bold line-through">
                                                ${product.oldPrice?.toFixed(2)}
                                            </span>
                                        )}
                                        <span className="text-slate-900 text-lg font-black tracking-tight">
                                            ${product.price?.toFixed(2)}
                                        </span>
                                    </div>
                                    
                                    <div className="w-10 h-10 bg-slate-50 group-hover:bg-rose-600 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-white transition-all shadow-inner group-hover:shadow-rose-200">
                                        <ArrowRight size={18} />
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

export default HomeProductList;
