import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../lib/api";
import { listProductDetails } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import { Star, ShoppingCart, Truck, Shield, RotateCcw, X, Plus, Minus, ArrowLeft } from "lucide-react";
import SEO from '../common/SEO';
import ProductImage from '../common/ProductImage';
import { ProductDetailSkeleton } from '../common/Skeleton';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState("overview");
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);
    const [showReviewLoginMessage, setShowReviewLoginMessage] = useState(false);
    const [showEligibilityMessage, setShowEligibilityMessage] = useState(false);
    const [canReview, setCanReview] = useState(false);

    const productDetails = useSelector((state) => state.productDetails);
    const { loading: detailsLoading, error, product: detailProduct } = productDetails;
    const { allProducts = [] } = useSelector((state) => state.productList);

    const cachedProduct = allProducts.find((p) => p.slug === id || p._id === id);
    const product = detailProduct && (detailProduct.slug === id || detailProduct._id === id)
        ? detailProduct
        : cachedProduct || detailProduct;
    const loading = !product && detailsLoading;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        const checkEligibility = async () => {
            if (userInfo && product && product._id) {
                try {
                    const { data } = await api.get(`/orders/check-review-eligibility/${product._id}`);
                    setCanReview(data.canReview);
                } catch (error) { setCanReview(false); }
            }
        };
        checkEligibility();
    }, [userInfo, product]);

    useEffect(() => { if (id) dispatch(listProductDetails(id)); }, [dispatch, id]);
    useEffect(() => { setActiveImage(0); }, [id]);

    const addToCartHandler = () => { dispatch(addToCart(product.slug || product._id, qty)); navigate('/cart'); };
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    if (loading) return <ProductDetailSkeleton />;
    if (error || !product) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
                <X className="text-[#EF4056]" size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Product Not Found</h2>
            <p className="text-slate-400 font-bold text-sm max-w-sm mb-12 uppercase tracking-widest">The hardware you're looking for is currently offline or removed.</p>
            <button onClick={() => navigate('/shop')} className="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-black transition-all">Back to Shop</button>
        </div>
    );

    const productImages = product.images && product.images.length > 0
        ? product.images.map(img => img.startsWith('http') ? img : `${import.meta.env.VITE_API_URL.replace('/api', '')}${img}`)
        : ["/assets/printer.png"];

    const relatedProducts = allProducts.filter(p => p.category === product.category && p._id !== product._id).slice(0, 4);

    return (
        <div className="min-h-screen bg-white">
            <SEO title={product.title} description={product.description?.replace(/<[^>]*>/g, '').substring(0, 160)} canonical={`/product/${product.slug}`} type="product" />
            
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#EF4056] mb-12 transition-colors">
                    <ArrowLeft size={16} /> Back to results
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
                    {/* Gallery */}
                    <div className="space-y-6">
                        <div 
                            className="aspect-square bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center p-12 relative overflow-hidden group cursor-crosshair shadow-inner"
                            onMouseEnter={() => setIsZooming(true)}
                            onMouseLeave={() => setIsZooming(false)}
                            onMouseMove={handleMouseMove}
                        >
                            <ProductImage src={productImages[activeImage]} alt={product.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                            {isZooming && (
                                <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block" style={{ backgroundImage: `url(${productImages[activeImage]})`, backgroundSize: '200%', backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`, backgroundRepeat: 'no-repeat' }}></div>
                            )}
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {productImages.map((img, i) => (
                                <button key={i} onClick={() => setActiveImage(i)} className={`w-24 h-24 rounded-[1.5rem] border-2 transition-all p-3 bg-white flex-shrink-0 ${activeImage === i ? 'border-[#EF4056] shadow-xl shadow-red-100' : 'border-slate-100 hover:border-slate-300'}`}>
                                    <ProductImage src={img} alt="" className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-8 text-left">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EF4056]">Smart ePrint Premium</p>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">{product.title}</h1>
                            <div className="flex items-center gap-4 pt-2">
                                <div className="flex text-amber-400">
                                    {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={product.rating >= s ? "currentColor" : "none"} className={product.rating >= s ? "" : "text-slate-200"} />)}
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">{product.numReviews || 0} REVIEWS</span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter">${product.price?.toFixed(2)}</span>
                            {product.oldPrice > product.price && (
                                <span className="text-xl font-bold text-slate-300 line-through tracking-tighter">${product.oldPrice?.toFixed(2)}</span>
                            )}
                        </div>

                        <p className="text-slate-500 font-medium leading-relaxed text-lg max-w-xl">{product.description?.substring(0, 200)}...</p>

                        <div className="space-y-6 pt-6">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex items-center bg-slate-50 rounded-2xl p-2 border border-slate-100">
                                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900"><Minus size={18}/></button>
                                    <span className="w-12 text-center font-black text-lg text-slate-900">{qty}</span>
                                    <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900"><Plus size={18}/></button>
                                </div>
                                <button 
                                    onClick={addToCartHandler} 
                                    disabled={product.countInStock === 0}
                                    className="flex-1 bg-[#EF4056] hover:bg-rose-600 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-rose-200 disabled:opacity-50"
                                >
                                    {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-2xl"><Truck size={20} className="text-[#EF4056]" /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fast Shipping</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-2xl"><Shield size={20} className="text-[#EF4056]" /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Safe Checkout</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-2xl"><RotateCcw size={20} className="text-[#EF4056]" /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="mt-24">
                    <div className="flex gap-12 border-b border-slate-100 mb-12">
                        {['overview', 'specifications', 'reviews'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-6 text-xs font-black uppercase tracking-widest relative transition-all ${activeTab === tab ? 'text-[#EF4056]' : 'text-slate-400 hover:text-slate-900'}`}>
                                {tab}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#EF4056] rounded-full" />}
                            </button>
                        ))}
                    </div>
                    <div className="max-w-3xl text-left">
                        {activeTab === 'overview' && <div dangerouslySetInnerHTML={{ __html: product.overview || product.description }} className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed" />}
                        {activeTab === 'specifications' && <div dangerouslySetInnerHTML={{ __html: product.technicalSpecification }} className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed" />}
                        {activeTab === 'reviews' && (
                            <div className="space-y-8">
                                {product.reviews?.length > 0 ? (
                                    product.reviews.map((r, i) => (
                                        <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                                            <div className="flex justify-between mb-4">
                                                <span className="font-black text-xs uppercase tracking-widest text-slate-900">{r.name}</span>
                                                <div className="flex text-amber-400"><Star size={12} fill="currentColor" /></div>
                                            </div>
                                            <p className="text-slate-600 font-medium italic">"{r.comment}"</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No reviews yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
