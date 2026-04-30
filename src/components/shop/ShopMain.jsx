import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/actions/productActions';
import { useImagePreload } from '../../lib/ImagePreloadContext';
import ProductImage from '../common/ProductImage';
import SEO from '../common/SEO';

const ITEMS_PER_PAGE = 9;

const ShopMain = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Use global image preload context
  const { getImageUrl: getProductImageUrl } = useImagePreload();

  const productList = useSelector((state) => state.productList);
  const { allProducts = [], allLoading: loading, allError: error, allLoaded } = productList;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!allLoaded) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, allLoaded]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, sortBy]);

  // Filter products client-side
  const getFilteredProducts = () => {
    let filtered = allProducts;
    if (debouncedSearchTerm) {
      filtered = filtered.filter(p => p.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }
    return filtered;
  };

  const productsToShow = getFilteredProducts();

  // Handle URL query parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('search')) {
      setSearchTerm(params.get('search'));
    }
  }, [location.search]);

  const filteredByPrice = productsToShow; // Add price filtering logic here if needed

  const filteredProducts = [...filteredByPrice].sort((a, b) => {
    if (sortBy === 'lowToHigh') return a.price - b.price;
    if (sortBy === 'highToLow') return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white">
      <SEO
          title="Shop Printers & Supplies"
          description="Browse our full collection of inkjet, laser, and all-in-one printers at Smart ePrint Solution. Best prices and free shipping."
          canonical="/shop"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 text-left uppercase tracking-tighter">Shop</h1>
        <hr className="border-gray-200 mb-6" />

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <p className="text-gray-500 text-sm font-medium">
            Showing {filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} results
          </p>
          <div className="flex gap-4 w-full sm:w-auto">
             <div className="relative flex-grow sm:flex-grow-0">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#EF4056] w-full sm:w-64"
                />
             </div>
             <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#EF4056] bg-white text-gray-600 cursor-pointer"
            >
              <option value="">Default sorting</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-8">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-square rounded-3xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
            <p className="text-[#EF4056] font-bold text-lg uppercase tracking-tighter">Sync Error</p>
            <p className="text-gray-600 text-sm mt-2">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-12">
            {paginatedProducts.map((product) => {
              const hasSale = product.oldPrice > 0 && product.oldPrice > product.price;
              return (
                <Link
                  key={product._id}
                  to={`/product/${product.slug || product._id}`}
                  className="group block"
                >
                  <div className="relative bg-white w-full aspect-square rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center mb-4 group-hover:shadow-xl group-hover:border-[#EF4056]/20 transition-all duration-300">
                    {hasSale && (
                      <span className="absolute top-3 left-3 z-10 bg-[#EF4056] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        Sale
                      </span>
                    )}
                    <ProductImage
                      src={getProductImageUrl(product) || '/assets/printer.png'}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-6"
                    />
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-[#EF4056] transition-colors text-left">
                    {product.title}
                  </h3>

                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 text-left">
                    {product.brand || 'Premium Quality'}
                  </p>

                  <div className="flex items-center gap-2">
                    {hasSale && (
                      <span className="text-gray-400 text-xs line-through font-medium">
                        ${product.oldPrice?.toFixed(2)}
                      </span>
                    )}
                    <span className="text-[#EF4056] text-base font-black">
                      ${product.price?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && !error && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tighter">No items found</h3>
            <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search terms.</p>
            <button onClick={clearFilters} className="px-6 py-2 bg-gray-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all">Clear All</button>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && filteredProducts.length > 0 && (
          <div className="flex items-center justify-center gap-2 pb-12">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center text-xs font-black rounded-xl transition-all ${
                  currentPage === i + 1
                    ? 'bg-[#EF4056] text-white shadow-lg shadow-red-200'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-[#EF4056] hover:text-[#EF4056]'
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
