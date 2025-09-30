import React, { useState } from 'react';
import { useEffect } from 'react';
import { Search, Filter, Grid2x2 as Grid, List, Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import FadeInUp from '../components/FadeInUp';
import MouseTrail from '../components/MouseTrail';

const Marketplace: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', count: 1247 },
    { id: 'clothing', name: 'Luxury Clothing', count: 456 },
    { id: 'accessories', name: 'Fashion Accessories', count: 342 },
    { id: 'footwear', name: 'Premium Footwear', count: 189 },
    { id: 'bags', name: 'Designer Bags', count: 234 },
    { id: 'jewelry', name: 'Fine Jewelry', count: 178 },
    { id: 'watches', name: 'Luxury Watches', count: 148 }
  ];

  const products = [
    {
      id: 1,
      name: "Designer Silk Saree Collection",
      manufacturer: "Heritage Textiles",
      price: 15000,
      originalPrice: 18000,
      rating: 4.8,
      reviews: 31,
      image: "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "clothing",
      inStock: true,
      minOrder: 10,
      location: "Bangalore, Karnataka"
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt Bundle",
      manufacturer: "Urban Threads",
      price: 2500,
      originalPrice: 3000,
      rating: 4.7,
      reviews: 89,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "clothing",
      inStock: true,
      minOrder: 50,
      location: "Mumbai, Maharashtra"
    },
    {
      id: 3,
      name: "Designer Denim Jeans Collection",
      manufacturer: "Denim Craft Co",
      price: 4500,
      originalPrice: 5500,
      rating: 4.6,
      reviews: 67,
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "clothing",
      inStock: true,
      minOrder: 25,
      location: "Delhi, NCR"
    },
    {
      id: 4,
      name: "Premium Leather Handbags",
      manufacturer: "Crafted Leather Co",
      price: 8500,
      originalPrice: 10000,
      rating: 4.6,
      reviews: 42,
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "bags",
      inStock: true,
      minOrder: 20,
      location: "Chennai, Tamil Nadu"
    },
    {
      id: 5,
      name: "Luxury Formal Shirts",
      manufacturer: "Elite Formals",
      price: 3500,
      originalPrice: 4200,
      rating: 4.8,
      reviews: 54,
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "clothing",
      inStock: true,
      minOrder: 30,
      location: "Pune, Maharashtra"
    },
    {
      id: 6,
      name: "Designer Ethnic Wear",
      manufacturer: "Royal Traditions",
      price: 12000,
      originalPrice: 15000,
      rating: 4.9,
      reviews: 38,
      image: "https://images.pexels.com/photos/8839888/pexels-photo-8839888.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "clothing",
      inStock: true,
      minOrder: 5,
      location: "Jaipur, Rajasthan"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-6 py-8 relative">
      <MouseTrail />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInUp className="mb-8">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
            Premium Fashion Marketplace
          </h1>
          <p className="text-xl text-[#ECE8E3]/80 max-w-3xl">
            Discover premium clothing and luxury fashion brands from verified manufacturers across India. Access exclusive wholesale pricing and credit-backed purchasing.
          </p>
        </FadeInUp>

        {/* Search and Filters */}
        <FadeInUp delay={100} className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#ECE8E3]/50" />
              <input
                type="text"
                placeholder="Search products, manufacturers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#ECE8E3]/10 border-2 border-[#ECE8E3]/30 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/50 transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center px-4 py-2 border-2 border-[#ECE8E3]/30 rounded-lg hover:border-[#D4AF37]/50 hover:bg-[#ECE8E3]/5 transition-all duration-200">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              
              <div className="flex border-2 border-[#ECE8E3]/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#D4AF37] text-[#08070A]' : 'hover:bg-[#ECE8E3]/10'} transition-all duration-200`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#D4AF37] text-[#08070A]' : 'hover:bg-[#ECE8E3]/10'} transition-all duration-200`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </FadeInUp>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FadeInUp delay={200} className="lg:w-64 flex-shrink-0">
            <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                          : 'hover:bg-[#ECE8E3]/10'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="float-right text-sm text-[#ECE8E3]/60">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>

          {/* Products Grid */}
          <div className="flex-1">
            <FadeInUp delay={300} className="mb-6">
              <div className="flex items-center justify-between">
                <p className="text-[#ECE8E3]/70">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
                <select className="px-4 py-2 bg-[#ECE8E3]/10 border border-[#ECE8E3]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none">
                  <option style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Sort by: Featured</option>
                  <option style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Price: Low to High</option>
                  <option style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Price: High to Low</option>
                  <option style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Rating</option>
                  <option style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Newest</option>
                </select>
              </div>
            </FadeInUp>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <FadeInUp key={product.id} delay={400 + index * 50}>
                  <div className={`group bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-[#D4AF37]/20 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-[#D4AF37]/20 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-[#D4AF37] transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center text-sm text-[#ECE8E3]/60">
                          <Star className="w-4 h-4 text-[#D4AF37] mr-1" />
                          {product.rating} ({product.reviews})
                        </div>
                      </div>
                      
                      <p className="text-[#ECE8E3]/70 text-sm mb-3">{product.manufacturer}</p>
                      <p className="text-[#ECE8E3]/60 text-sm mb-4">{product.location}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-[#D4AF37]">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-[#ECE8E3]/50 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-green-400">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                        </span>
                      </div>
                      
                      <p className="text-sm text-[#ECE8E3]/60 mb-4">
                        Min. Order: {product.minOrder} pieces
                      </p>
                      
                      <div className="flex gap-2">
                        <button 
                          disabled={!product.inStock}
                          className="reward-button flex-1 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-medium rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:-translate-y-1 hover:scale-105 interactive-glow"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </button>
                        <button className="px-4 py-2 border-2 border-[#ECE8E3]/30 hover:border-[#D4AF37] hover:bg-[#ECE8E3]/5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover-glow-enhanced interactive-glow">
                          Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>

            {/* Pagination */}
            <FadeInUp delay={600} className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border-2 border-[#ECE8E3]/30 rounded-lg hover:border-[#D4AF37] hover:bg-[#ECE8E3]/5 transition-all duration-200">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      page === 1
                        ? 'bg-[#D4AF37] text-[#08070A]'
                        : 'border-2 border-[#ECE8E3]/30 hover:border-[#D4AF37] hover:bg-[#ECE8E3]/5'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 border-2 border-[#ECE8E3]/30 rounded-lg hover:border-[#D4AF37] hover:bg-[#ECE8E3]/5 transition-all duration-200">
                  Next
                </button>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;