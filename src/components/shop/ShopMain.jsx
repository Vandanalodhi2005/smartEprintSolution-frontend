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
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedUsageCategory, setSelectedUsageCategory] = useState([]);
  const [selectedWireless, setSelectedWireless] = useState('');
  const [selectedMainFunction, setSelectedMainFunction] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Use global image preload context (images start preloading on app mount)
  const { getImageUrl: getProductImageUrl } = useImagePreload();

  const productList = useSelector((state) => state.productList);
  const { allProducts = [], allLoading: loading, allError: error, allLoaded } = productList;

  // Debounce search term (wait 500ms after user stops typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // allProducts prefetched by App.jsx — only fetch if somehow missed
  useEffect(() => {
    if (!allLoaded) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, allLoaded]);

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedBrand, selectedTechnology, selectedUsageCategory, selectedWireless, selectedMainFunction, selectedRating, priceRange, sortBy]);

  /**
   * Product Filtering Engine
   * Handles multi-criteria filtering for the shop catalog.
   */
  const processProducts = () => {
    let result = [...allProducts];

    // 1. Search Query Filter
    if (debouncedSearchTerm) {
      const q = debouncedSearchTerm.toLowerCase();
      result = result.filter(p => p.title?.toLowerCase().includes(q));
    }

    // 2. Brand Filter
    if (selectedBrand) {
      result = result.filter(p => p.brand?.toLowerCase() === selectedBrand.toLowerCase());
    }

    // 3. Technology Filter (Handle both string and array formats)
    if (selectedTechnology) {
      result = result.filter(p => 
        Array.isArray(p.technology) 
          ? p.technology.includes(selectedTechnology) 
          : p.technology === selectedTechnology
      );
    }

    // 4. Usage Category Filter (Check intersection)
    if (selectedUsageCategory.length > 0) {
      result = result.filter(p => 
        Array.isArray(p.usageCategory) && 
        selectedUsageCategory.some(cat => p.usageCategory.includes(cat))
      );
    }

    // 5. Wireless Capability
    if (selectedWireless) {
      result = result.filter(p => p.wireless === selectedWireless);
    }

    // 6. Main Function Filter
    if (selectedMainFunction.length > 0) {
      result = result.filter(p => 
        Array.isArray(p.mainFunction) && 
        selectedMainFunction.some(f => p.mainFunction.includes(f))
      );
    }

    // 7. Price Range Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 8. Rating Filter
    if (selectedRating > 0) {
      result = result.filter(p => Math.round(p.rating || 0) >= selectedRating);
    }

    // 9. Sorting Logic
    if (sortBy === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  };

  // Memoize or just call to get final products for the grid
  const productsToShow = processProducts();

  // Pagination Math
  const itemsPerPage = ITEMS_PER_PAGE;
  const totalPages = Math.ceil(productsToShow.length / itemsPerPage);
  const paginatedProducts = productsToShow.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle URL query parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Read URL parameters and set filters
    if (params.has('search')) {
      setSearchTerm(params.get('search'));
    }
    if (params.has('technology')) {
      setSelectedTechnology(params.get('technology'));
    }
    if (params.has('usageCategory')) {
      setSelectedUsageCategory([params.get('usageCategory')]);
    }
    if (params.has('brand')) {
      setSelectedBrand(params.get('brand'));
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-white">
      <SEO
          title="Shop Printers & Supplies"
          description="Browse our full collection of inkjet, laser, and all-in-one printers. Filter by brand, technology, and price. Free shipping on orders."
          canonical="/shop"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Shop Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Shop</h1>
        <hr className="border-gray-300 mb-6" />

        {/* Top Bar - Results count and Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <p className="text-gray-500 text-sm">
            Showing {productsToShow.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, productsToShow.length)} of {productsToShow.length} results
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
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Loading State */}
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

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-700 font-semibold text-lg">Error loading products</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
        )}

        {/* Products Grid - 3 columns */}
        {!loading && productsToShow.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-12">
            {paginatedProducts.map((product) => {
              const hasSale = product.oldPrice > 0 && product.oldPrice > product.price;
              return (
                <Link
                  key={product._id}
                  to={`/product/${product.slug || product._id}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="relative bg-white w-full aspect-square overflow-hidden flex items-center justify-center mb-4">
                    {hasSale && (
                      <span className="absolute top-3 left-3 z-10 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                        Sale!
                      </span>
                    )}
                    <ProductImage
                      src={getProductImageUrl(product) || '/printer-without-bg.png'}
                      alt={product.title}
                      width="320"
                      height="320"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#EF4056] transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-xs text-gray-400 mb-2">
                    {product.category?.name || 'Uncategorized'}
                  </p>

                  {/* Price */}
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

        {/* Empty State */}
        {!loading && productsToShow.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
              🔍
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search to find what you're looking for.</p>
          </div>
        )}

        {/* Pagination - Numbered squares */}
        {!loading && totalPages > 1 && productsToShow.length > 0 && (
          <div className="flex items-center gap-1 pb-12">
            {(() => {
              const pages = [];
              const maxVisible = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
              let endPage = Math.min(totalPages, startPage + maxVisible - 1);
              if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1);
              }

              // Add previous page button if not on first page
              if (currentPage > 1) {
                pages.push(
                  <button
                    key="prev"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="w-10 h-10 flex items-center justify-center text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    ←
                  </button>
                );
              }

              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-medium border transition-colors ${
                      currentPage === i
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i}
                  </button>
                );
              }

              if (endPage < totalPages) {
                pages.push(
                  <button
                    key="next"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="w-10 h-10 flex items-center justify-center text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    →
                  </button>
                );
              }

              return pages;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopMain;
