
import React from 'react';

function Cart({ cart, onUpdateQuantity, onRemove, onContinueShopping }) {
  const FREE_SHIPPING_THRESHOLD = 150;

  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    subtotal = subtotal + item.product.price * item.quantity;}

  let shipping = 0;
  if (subtotal === 0) {
    shipping = 0;
  } else if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    shipping = 0;
  } else {
    shipping = 15; 
  }

  const grandTotal = subtotal + shipping;
  let percentageToFreeShipping = 0;
  if (subtotal > 0) {
    percentageToFreeShipping = (subtotal / FREE_SHIPPING_THRESHOLD) * 100;
    if (percentageToFreeShipping > 100) {
      percentageToFreeShipping = 100;
    }
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-zinc-100 dark:bg-zinc-900 w-24 h-24 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-zinc-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Your cart is empty
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm text-center">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          onClick={onContinueShopping}
          className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-8 py-3 rounded-xl font-medium" >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
        Shopping Cart
      </h1>
  <div className="flex flex-col lg:flex-row gap-12">
  <div className="w-full lg:w-2/3">
   <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border mb-8">
           <div className="flex justify-between items-end mb-2">
           <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {subtotal >= FREE_SHIPPING_THRESHOLD  ? "You've unlocked free shipping!"
          : `Add $${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping`}</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
              <div
                className="bg-cyan-500 h-2 rounded-full"
                style={{ width: percentageToFreeShipping + '%' }}/>
            </div>
          </div>
          <div className="space-y-6">
            {cart.map((item) => {
              const itemTotal = item.product.price * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white dark:bg-zinc-900 rounded-2xl border gap-6" >
                  <div className="w-24 h-24 rounded-xl overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {item.product.name}
                    </h3>
                    <div className="text-sm text-zinc-500">
                      {item.product.category}
                    </div>
                    <div className="font-medium">
                      ${item.product.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity - 1) }> -</button>
                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1) } > + </button>
                    <div className="font-semibold w-20 text-right">
                      ${itemTotal.toFixed(2)}
                    </div>
                    <button onClick={() => onRemove(item.product.id)}>  🗑 </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 border-b pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated later</span>
              </div>
            </div>

            <div className="flex justify-between mt-6 mb-6">
              <span className="font-bold">Total</span>
              <span className="text-xl font-bold">
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl">
              Checkout
            </button>
            <button
              onClick={onContinueShopping}
              className="w-full mt-4 text-sm text-gray-500" > Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;