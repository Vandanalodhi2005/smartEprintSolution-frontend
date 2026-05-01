import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../lib/api";
import { listProductDetails } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import { Star, ShoppingCart, Truck, Shield, RotateCcw, X } from "lucide-react";
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

    const { products: allProducts = [] } = useSelector((state) => state.productList);

    const product = detailProduct && (detailProduct.slug === id || detailProduct._id === id)
        ? detailProduct
        : allProducts.find(p => p.slug === id || p._id === id) || detailProduct;
    
    const loading = !product && detailsLoading;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const relatedProducts = product && product.brand
        ? allProducts.filter(p => p.brand === product.brand && p._id !== product._id).slice(0, 4)
        : [];

    useEffect(() => {
        const checkEligibility = async () => {
            if (userInfo && product && product._id) {
                try {
                    const { data } = await api.get(`/orders/check-review-eligibility/${product._id}`);
                    setCanReview(data.canReview);
                } catch (error) {
                    setCanReview(false);
                }
            }
        };
        checkEligibility();
    }, [userInfo, product]);

    useEffect(() => {
        if (id) {
            dispatch(listProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        setActiveImage(0);
    }, [id]);

    const addToCartHandler = () => {
        dispatch(addToCart(product.slug || product._id, qty));
        navigate('/cart');
    };

    const buyNowHandler = () => {
        dispatch(addToCart(product.slug || product._id, qty));
        navigate('/cart');
    };

    const handleMouseEnter = () => setIsZooming(true);
    const handleMouseLeave = () => setIsZooming(false);
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    if (loading) return <ProductDetailSkeleton />;

    if (error || !product) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-8">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Product Not Found</h2>
            <button onClick={() => navigate('/')} className="px-8 py-4 bg-[#EF4056] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-700 transition-all">Return Home</button>
        </div>
    );

    const productImages = product.images && product.images.length > 0
        ? product.images.map(img => img.startsWith('http') ? img : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${img}`)
        : [product.image?.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${product.image}` || "/assets/printer.png"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
            <SEO
                title={product.title}
                description={product.description?.substring(0, 160) || `Buy ${product.title} at Smart ePrint.`}
                canonical={`/product/${product.slug || product._id}`}
                type="product"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20">
                    <div className="flex flex-col md:flex-row gap-4 h-fit lg:sticky lg:top-24">
                        <div className="flex flex-row md:flex-col gap-3 w-full md:w-20 order-2 md:order-1 overflow-x-auto scrollbar-hide">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`aspect-square min-w-[70px] max-w-[70px] md:min-w-0 md:max-w-none md:w-full rounded-xl border-2 transition-all overflow-hidden bg-white p-2
                                    ${activeImage === index ? 'border-[#EF4056] shadow-md' : 'border-slate-100 hover:border-slate-300'}`}
                                >
                                    <ProductImage src={img} alt={`${product.title} ${index}`} className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 aspect-[4/5] bg-white rounded-3xl border border-slate-100 shadow-xl flex items-center justify-center p-8 overflow-hidden group order-1 md:order-2 relative">
                            <ProductImage
                                src={productImages[activeImage]}
                                alt={product.title}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 relative z-10"
                            />
                             {isZooming && (
                                <div className="hidden xl:block absolute top-0 -right-[26rem] w-[25rem] h-[25rem] bg-white border-2 border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-30">
                                    <div
                                        className="w-full h-full"
                                        style={{
                                            backgroundImage: `url(${productImages[activeImage]})`,
                                            backgroundSize: '600% 600%',
                                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    />
                                </div>
                            )}
                            <div className="absolute inset-0 cursor-crosshair z-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight uppercase">
                                {product.title}
                            </h1>
                            <div className="h-1 w-24 bg-[#EF4056] rounded-full"></div>
                        </div>

                        <div className="space-y-4 pb-6 border-b border-slate-100">
                             <div className="flex items-center gap-2">
                                <span className="text-2xl sm:text-3xl font-black text-gray-900">${product.price?.toFixed(2)}</span>
                                {product.oldPrice > product.price && (
                                    <span className="text-lg text-slate-400 line-through font-bold">${product.oldPrice?.toFixed(2)}</span>
                                )}
                             </div>
                             <div className="text-sm font-medium text-slate-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: product.shortDetails || product.description }}></div>
                        </div>

                        <div className="space-y-6">
                            {product.countInStock > 0 && (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 hover:bg-slate-50 transition-colors"> - </button>
                                        <span className="px-4 font-bold min-w-[3rem] text-center">{qty}</span>
                                        <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="px-4 py-2 hover:bg-slate-50 transition-colors"> + </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className={`flex-1 py-4 px-6 rounded-2xl transition-all font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 flex items-center justify-center gap-2
                                        ${product.countInStock > 0 ? 'bg-slate-900 text-white hover:bg-black' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                                >
                                    <ShoppingCart size={18} />
                                    {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                                {product.countInStock > 0 && (
                                    <button onClick={buyNowHandler} className="flex-1 py-4 px-6 bg-[#EF4056] text-white rounded-2xl hover:bg-red-700 transition-all font-black uppercase text-xs tracking-widest shadow-lg active:scale-95">
                                        Buy Now
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100">
                             <div className="flex flex-col items-center gap-2">
                                <Truck className="text-[#EF4056]" size={20} />
                                <span className="text-[10px] font-bold text-slate-600">Fast Shipping</span>
                             </div>
                             <div className="flex flex-col items-center gap-2">
                                <Shield className="text-[#EF4056]" size={20} />
                                <span className="text-[10px] font-bold text-slate-600">Secure Payment</span>
                             </div>
                             <div className="flex flex-col items-center gap-2">
                                <RotateCcw className="text-[#EF4056]" size={20} />
                                <span className="text-[10px] font-bold text-slate-600">Easy Returns</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-12">
                    <div className="flex gap-8 overflow-x-auto scrollbar-hide border-b border-slate-100">
                        {["overview", "specifications", "reviews"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 text-sm font-black uppercase tracking-widest transition-all relative
                                    ${activeTab === tab ? 'text-[#EF4056]' : 'text-slate-400 hover:text-[#EF4056]'}`}
                            >
                                {tab}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#EF4056] rounded-full" />}
                            </button>
                        ))}
                    </div>

                    <div className="py-12">
                        {activeTab === "overview" && (
                            <div className="max-w-4xl prose prose-slate">
                                <div dangerouslySetInnerHTML={{ __html: product.description + (product.overview || '') }} />
                            </div>
                        )}
                        {activeTab === "specifications" && (
                             <div className="max-w-4xl prose prose-slate">
                                <div dangerouslySetInnerHTML={{ __html: product.technicalSpecification || 'No specifications available for this product.' }} />
                            </div>
                        )}
                        {activeTab === "reviews" && (
                            <div className="space-y-8">
                                <h2 className="text-2xl font-black text-gray-900 uppercase">Customer Reviews</h2>
                                {product.reviews?.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {product.reviews.map((review, i) => (
                                            <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                                <div className="flex items-center gap-1 mb-2">
                                                    {[...Array(5)].map((_, star) => (
                                                        <Star key={star} size={14} className={star < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                                                    ))}
                                                </div>
                                                <p className="font-bold text-sm text-gray-900 mb-1">{review.name}</p>
                                                <p className="text-slate-600 text-sm italic">"{review.comment}"</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500">No reviews yet. Be the first to review!</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-slate-100">
                        <h3 className="text-2xl font-black text-[#EF4056] uppercase tracking-tight mb-8">Related Products</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map(item => (
                                <Link key={item._id} to={`/product/${item.slug || item._id}`} className="group block">
                                    <div className="aspect-square bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-center mb-4 group-hover:shadow-md transition-all">
                                        <ProductImage src={item.image?.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${item.image}`} alt={item.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                                    </div>
                                    <h4 className="font-bold text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-[#EF4056] transition-colors">{item.title}</h4>
                                    <p className="font-black text-gray-900">${item.price?.toFixed(2)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
