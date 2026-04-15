
import React, { useState, useEffect } from 'react';
import { products } from '../data/products';

function ProductCard(props) {
  const product = props.product;
  const onProductClick = props.onProductClick;
  const onAddToCart = props.onAddToCart;

  function handleCardClick() {
    onProductClick(product);
  }

  function handleAddClick(event) {
    event.stopPropagation();
    onAddToCart(product);
  }

  return (
    <div 
      className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 cursor-pointer" 
      onClick={handleCardClick}
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 px-2 py-1 rounded text-xs">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {product.name}
          </h3>
          <span className="text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-zinc-500 mb-4">
          {product.tagline}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t">
          <div className="flex items-center text-sm font-medium text-amber-500">
            ⭐ {product.rating}
          </div>
          <button
            onClick={handleAddClick}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-zinc-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

function ProductListing({ onProductClick, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All'];
  for (let i = 0; i < products.length; i++) {
    if (!categories.includes(products[i].category)) {
      categories.push(products[i].category);
    }
  }

  useEffect(() => {
    const timer = setTimeout(function () {
      setIsLoading(false);
    }, 1000);

    return function () {
      clearTimeout(timer);
    };
  }, []);

  let filteredProducts = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const matchSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchCategory =
      activeCategory === 'All' || product.category === activeCategory;

    if (matchSearch && matchCategory) {
      filteredProducts.push(product);
    }
  }

  function clearFilters() {
    setSearchTerm('');
    setActiveCategory('All');
  }

  return (
    <div className="pb-24 animate-in fade-in duration-500">

      <div className="text-center max-w-2xl mx-auto mt-8 mb-10">
        <h1 className="text-4xl font-bold">
          Elevate Your Workspace
        </h1>
        <p className="text-zinc-500 mt-3">
          Premium mechanical keyboards and accessories.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

        {/* Category Buttons */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category, index) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={
                  isActive
                    ? "px-4 py-2 rounded-full bg-black text-white"
                    : "px-4 py-2 rounded-full bg-zinc-100"
                }
              >
                {category}
              </button>
            );
          })}

        </div>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-full w-full md:w-72"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-[420px] bg-zinc-100 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">

          <h3>No products found</h3>
          <p>Try adjusting filters</p>

          <button onClick={clearFilters} className="mt-4 text-cyan-600">
            Clear filters
          </button>

        </div>
      )}

    </div>
  );
}

export default ProductListing;

