/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { Search, MapPin, Filter, Star, Clock, DollarSign } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import PurchaseModal from '@/components/PurchaseModal';
import { products } from '@/components/products/productsData';

const categories = ['All', 'Hair Salons', 'Nails', 'Eyebrows & Lashes', 'Skincare', 'Massage', 'Makeup'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'popular') return b.reviews - a.reviews;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
    if (sortBy === 'price-high') return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
    return 0;
  });

  // Group products by category when "All" is selected
  const productsByCategory = selectedCategory === 'All' 
    ? categories.filter(cat => cat !== 'All').map(category => ({
        category,
        products: sortedProducts.filter(p => p.category === category)
      })).filter(group => group.products.length > 0)
    : [{ category: selectedCategory, products: sortedProducts }];

  const handleBuyNow = (product: typeof products[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  };

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePurchaseComplete = () => {
    // Optionally handle post-purchase actions
  };

  return (
    <div className='min-h-screen bg-gray-50 font-inter'>
      <Navbar />
      
      {/* Hero Section */}
      <div className='pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-white via-purple-50/30 to-pink-50/30'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight mb-4'>
            Browse Products & Packages
          </h1>
          <p className='text-gray-600 text-lg sm:text-xl max-w-3xl mb-8'>
            Discover amazing deals on beauty and wellness services
          </p>

          {/* Search Bar */}
          <div className='max-w-4xl mt-8'>
            <div className='flex flex-col lg:flex-row items-stretch lg:items-center bg-white rounded-3xl lg:rounded-full px-4 sm:px-6 py-4 lg:py-3 gap-4 border-4 sm:border-[7px] border-white/40 backdrop-blur-md shadow-lg'>
              <div className='flex-1 flex items-center gap-3'>
                <Search className='w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search products or services...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='flex-1 outline-none text-gray-700 placeholder-gray-400'
                />
              </div>
              
              <div className='hidden lg:block h-6 w-px bg-gray-300' />
              
              <div className='flex items-center gap-3'>
                <MapPin className='w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Location'
                  className='flex-1 outline-none text-gray-700 placeholder-gray-400'
                />
              </div>
              
              <button className='w-full lg:w-auto lg:ml-4 bg-black text-white rounded-full px-8 py-3 font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base'>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
          {/* Category Pills */}
          <div className='flex gap-2 overflow-x-auto pb-2 flex-1'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className='flex items-center gap-2'>
            <Filter className='w-4 h-4 text-gray-500' />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 outline-none focus:border-black'
            >
              <option value='popular'>Most Popular</option>
              <option value='rating'>Highest Rated</option>
              <option value='price-low'>Price: Low to High</option>
              <option value='price-high'>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products by Category */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
        {productsByCategory.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-gray-500 text-lg'>No products found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className='space-y-12'>
            {productsByCategory.map(({ category, products: categoryProducts }) => (
              <div key={category} className='space-y-6'>
                {/* Category Header */}
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='text-3xl font-bold text-black mb-2'>{category}</h2>
                    <p className='text-gray-600'>
                      {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'} available
                    </p>
                  </div>
                </div>

                {/* Products Grid for this Category */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                  {categoryProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/vendor/${product.id}`}
                      className='group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer'
                    >
                      <div className='relative h-48 overflow-hidden'>
                        <img
                          src={product.image}
                          alt={product.name}
                          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                        />
                        {product.originalPrice && (
                          <div className='absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold'>
                            {Math.round((1 - parseFloat(product.price.replace('$', '')) / parseFloat(product.originalPrice.replace('$', ''))) * 100)}% OFF
                          </div>
                        )}
                      </div>
                      
                      <div className='p-5'>
                        <div className='flex items-start justify-between mb-2'>
                          <span className='text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded'>
                            {product.category}
                          </span>
                          <div className='flex items-center gap-1'>
                            <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                            <span className='text-sm font-semibold'>{product.rating}</span>
                            <span className='text-xs text-gray-500'>({product.reviews})</span>
                          </div>
                        </div>
                        
                        <h3 className='text-lg font-bold text-black mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors'>
                          {product.name}
                        </h3>
                        
                        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                          {product.description}
                        </p>
                        
                        <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            <span>{product.duration}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <MapPin className='w-4 h-4' />
                            <span className='truncate'>{product.location}</span>
                          </div>
                        </div>
                        
                        <div className='flex items-center justify-between'>
                          <div>
                            {product.originalPrice && (
                              <span className='text-sm text-gray-400 line-through mr-2'>
                                {product.originalPrice}
                              </span>
                            )}
                            <span className='text-2xl font-bold text-black'>{product.price}</span>
                          </div>
                          <button 
                            onClick={(e) => handleBuyNow(product, e)}
                            className='px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors'
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PurchaseModal
        product={selectedProduct}
        isOpen={isPurchaseModalOpen}
        onClose={handleClosePurchaseModal}
        onPurchaseComplete={handlePurchaseComplete}
      />

      <Footer />
    </div>
  );
}

