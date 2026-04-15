
import React, { useState } from 'react';

function ProductDetail({ product, onBack, onAddToCart, cart, onGoToCart }) {
  // State: quantity user wants to add
  const [quantity, setQuantity] = useState(1);

  function increment() {
    setQuantity(quantity + 1);
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  let cartItem = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === product.id) {
      cartItem = cart[i];
      break;
    }
  }

  let inCartQty = 0;
  if (cartItem) {
    inCartQty = cartItem.quantity;
  }

  const totalPrice = product.price * quantity;

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className="group flex items-center text-sm font-medium text-zinc-500 mb-8 hover:text-zinc-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Products
      </button>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden bg-zinc-100 aspect-square border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="text-sm text-cyan-600 uppercase mb-2"> {product.category}  </div>
      <h1 className="text-3xl font-bold mb-4"> {product.name} </h1>

          <div className="text-2xl font-semibold mb-6"> ${product.price.toFixed(2)}</div>
          <p className="text-zinc-600 mb-8"> {product.description}</p>
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4"> Specifications
            </h3>
            <ul>
              {product.features.map((feature, index) => {
                return (
                  <li key={index} className="flex items-center mb-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t pt-6">
  <div className="flex items-center gap-4 mb-6">
              <span>Quantity</span>
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={decrement} 
                  className="px-4 py-2 hover:bg-zinc-100 transition-colors" >  − </button>
                <div className="px-4 py-2 border-x">
                  {quantity}
                </div>
                <button 
                  onClick={increment} 
                  className="px-4 py-2 hover:bg-zinc-100 transition-colors" > + </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
           <button
                onClick={() => onAddToCart(quantity)}
                className="flex-1 bg-black text-white py-4 rounded-xl font-semibold hover:bg-zinc-800 transition-colors" >
                Add {quantity} to Cart • ${totalPrice.toFixed(2)} </button>

              {inCartQty > 0 ? (
                <button
                  onClick={onGoToCart}
                  className="flex-1 border border-cyan-600 text-cyan-600 py-4 rounded-xl font-semibold hover:bg-cyan-50 transition-colors" >
                  View Cart ({inCartQty})  </button>
              ) : null}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;