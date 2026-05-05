import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';
import { useImagePreload } from '../../lib/ImagePreloadContext';

const FeaturedProducts = () => {
    const { allProducts = [] } = useSelector((state) => state.productList);
    const { getImageUrl } = useImagePreload();

    // Get a subset of products to feature
    const featured = allProducts.slice(0, 4);

    if (featured.length === 0) return null;

    return (
        <section className="w-full py-16 sm:py-20 bg-[#fffcf8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <span className="flex items-center gap-2 bg-[#fff7ed] text-[#f97316] font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#ffedd5]">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                            Shop Now
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
                        Our <span className="text-[#f97316]">Products</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        Check out our selection of printers and scanners
                    </p>
                    <div className="mt-8">
                        <Link 
                            to="/shop" 
                            className="inline-flex items-center gap-2 bg-[#f97316] text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-[#ea580c] transition-all shadow-lg shadow-orange-500/20"
                        >
                            See All Products <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Product List (Alternating Pattern) */}
                <div className="flex flex-col gap-10 sm:gap-16">
                    {featured.map((product, index) => {
                        const isEven = index % 2 === 0;
                        
                        return (
                            <div 
                                key={product._id} 
                                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100 transition-transform hover:scale-[1.01]`}
                            >
                                {/* Image Column */}
                                <div className="w-full md:w-2/5 relative min-h-[300px] bg-slate-50 flex items-center justify-center p-8">
                                    <span className="absolute top-6 left-6 z-10 bg-[#22c55e] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1">
                                        <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div> In Stock
                                    </span>
                                    <img 
                                        src={getImageUrl(product) || '/printer-without-bg.png'} 
                                        alt={product.title}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                </div>

                                {/* Content Column */}
                                <div className="w-full md:w-3/5 p-8 sm:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="h-[1px] w-8 bg-slate-300"></div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            {product.sku || `PRN-${product._id?.slice(-8).toUpperCase()}`}
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-4 leading-tight">
                                        {product.title}
                                    </h3>
                                    
                                    <p className="text-slate-600 text-sm sm:text-base mb-8 line-clamp-2 leading-relaxed">
                                        {product.description || "Fast, reliable and high-quality printing solution for your home and office needs."}
                                    </p>

                                    {/* Features / Tags */}
                                    <div className="flex flex-wrap gap-2 mb-10">
                                        {(product.tags || ['Wireless', 'All-in-One', 'Energy Star']).map((tag) => (
                                            <span key={tag} className="bg-orange-50 text-orange-600 text-[10px] font-bold uppercase px-4 py-1.5 rounded-full border border-orange-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mt-auto border-t border-slate-100 pt-8">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Our Price</span>
                                            <span className="text-3xl sm:text-4xl font-black text-[#f97316]">
                                                ${product.price}
                                            </span>
                                        </div>
                                        
                                        <Link 
                                            to={`/product/${product._id}`} 
                                            className="inline-flex items-center gap-2 bg-[#f97316] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-[#ea580c] transition-all shadow-lg shadow-orange-500/20"
                                        >
                                            View Product <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
