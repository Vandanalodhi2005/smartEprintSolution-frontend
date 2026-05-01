import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/actions/productActions';
import ProductImage from '../common/ProductImage';
import SEO from '../common/SEO';

const ITEMS_PER_PAGE = 9;

const ShopMain = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const productList = useSelector((state) => state.productList);
  const { products = [], loading, error, allLoaded } = productList;

  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const search = params.get('search') || '';
      setSearchTerm(search);
      
      // We use listProducts from actions which handles filtering/pagination
      dispatch(listProducts(search, '', currentPage, '', '', sortBy));
  }, [dispatch, location.search, currentPage, sortBy]);

  const itemsPerPage = ITEMS_PER_PAGE;
  // Note: Backend should return totalPages, but if not we estimate
  const totalPages = Math.ceil((productList.count || products.length) / itemsPerPage) || 1;

  return (
    <div className="min-h-screen bg-white">
      <SEO
          title="Shop Printers & Supplies"
          description="Browse our full collection of inkjet, laser, and all-in-one printers. Filter by brand, technology, and price. Free shipping on orders."
          canonical="/shop"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Shop</h1>
        <hr className="border-gray-300 mb-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <p className="text-gray-500 text-sm">
            Showing results for {searchTerm || 'all products'}
          </p>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-600 cursor-pointer"
          >
            <option value="">Default sorting</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-8">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-square mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-700 font-semibold text-lg">Error loading products</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-12">
            {products.map((product) => {
              const hasSale = product.oldPrice > 0 && product.oldPrice > product.price;
              const imageUrl = product.image?.startsWith('http') 
                  ? product.image 
                  : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${product.image}`;

              return (
                <Link
                  key={product._id}
                  to={`/product/${product.slug || product._id}`}
                  className="group block"
                >
                  <div className="relative bg-white w-full aspect-square overflow-hidden flex items-center justify-center mb-4 border border-gray-100 rounded-lg group-hover:shadow-md transition-all">
                    {hasSale && (
                      <span className="absolute top-3 left-3 z-10 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                        Sale!
                      </span>
                    )}
                    <ProductImage
                      src={imageUrl || '/assets/printer.png'}
                      alt={product.title}
                      width="320"
                      height="320"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                    />
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#EF4056] transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-xs text-gray-400 mb-2">
                    {product.brand || 'Printer'}
                  </p>

                  <div className="flex items-center gap-2">
                    {hasSale && (
                      <span className="text-gray-400 text-sm line-through">
                        ${product.oldPrice?.toFixed(2)}
                      </span>
                    )}
                    <span className="text-gray-900 text-sm font-bold">
                      ${product.price?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search to find what you're looking for.</p>
          </div>
        )}

        {!loading && totalPages > 1 && products.length > 0 && (
          <div className="flex items-center justify-center gap-2 pb-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 flex items-center justify-center text-sm font-medium border transition-colors ${
                          currentPage === i + 1
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                      {i + 1}
                  </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopMain;
