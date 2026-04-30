import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listProducts } from "../../redux/actions/productActions";
import { useImagePreload } from "../../lib/ImagePreloadContext";
import ProductImage from "../common/ProductImage";

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
        image: product.image
            ? (product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${product.image}`)
            : (product.images && product.images.length > 0
                ? (product.images[0].startsWith('http') ? product.images[0] : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${product.images[0]}`)
                : "/assets/printer.png"),
        link: `/product/${product.slug || product._id}`
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                        Home & Office Printers
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base mt-2">
                        Find your ideal printer — reliable, efficient, and built to match your workflow.
                    </p>
                </div>
                <Link
                    to="/shop"
                    className="hidden sm:inline-block shrink-0 border border-[#EF4056] text-[#EF4056] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#EF4056] hover:text-white transition-colors duration-200 mt-1"
                >
                    SEE MORE
                </Link>
            </div>

            {/* Mobile See More */}
            <div className="sm:hidden mb-6">
                <Link
                    to="/shop"
                    className="inline-block border border-[#EF4056] text-[#EF4056] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#EF4056] hover:text-white transition-colors duration-200"
                >
                    SEE MORE
                </Link>
            </div>

            {/* Product Grid - 4 columns */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mt-8">
                {displayProducts.map((product) => {
                    const hasSale = product.oldPrice > 0 && product.oldPrice > product.price;
                    return (
                        <Link
                            key={product._id || product.slug}
                            to={product.link}
                            className="group block"
                        >
                            {/* Image */}
                            <div className="relative bg-white w-full aspect-square overflow-hidden flex items-center justify-center mb-4">
                                {hasSale && (
                                    <span className="absolute top-2 left-2 z-10 bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                                        Sale!
                                    </span>
                                )}
                                <ProductImage
                                    src={getImageUrl(product) || '/assets/printer.png'}
                                    alt={product.title}
                                    width="300"
                                    height="300"
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                                />
                            </div>

                            {/* Info */}
                            <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#EF4056] transition-colors">
                                {product.title}
                            </h3>

                            {product.category && (
                                <p className="text-xs text-gray-400 mb-2">
                                    {typeof product.category === 'object' ? product.category.name : product.category}
                                </p>
                            )}

                            {/* Price */}
                            <div className="flex items-center gap-2">
                                {hasSale && (
                                    <span className="text-gray-400 text-sm line-through">
                                        ${product.oldPrice?.toFixed(2)}
                                    </span>
                                )}
                                <span className="text-gray-900 text-sm font-bold">
                                    ${product.price?.toFixed(2)}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default HomeProductList;
