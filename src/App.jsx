
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Toast from './components/Toast';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState('listing');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cart, setCart] = useState(function () {
    const saved = localStorage.getItem('arca_cart');
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  const [isDark, setIsDark] = useState(true);
  const [toastMessage, setToastMessage] = useState('');


  useEffect(function () {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(function () {
    localStorage.setItem('arca_cart', JSON.stringify(cart));
  }, [cart]);

  function toggleDarkMode() {
    setIsDark(!isDark);
  }

  function navigateTo(view, product) {
    if (product) {
      setSelectedProduct(product);
    }

    setCurrentView(view);
  }

  function showToast(message) {
    setToastMessage(message);

    setTimeout(function () {
      setToastMessage('');
    }, 3000);
  }

  function addToCart(product, quantity) {
    if (!quantity) {
      quantity = 1;
    }

    setCart(function (prevCart) {
      let found = null;

      for (let i = 0; i < prevCart.length; i++) {
        if (prevCart[i].product.id === product.id) {
          found = prevCart[i];
          break;
        }
      }

      if (found) {
        return prevCart.map(function (item) {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + quantity
            };
          }
          return item;
        });
      }

      return [
        ...prevCart,
        {
          product: product,
          quantity: quantity
        }
      ];
    });

    showToast('Added ' + product.name + ' to cart');
  }

  function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(function (prevCart) {
      return prevCart.map(function (item) {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: newQuantity
          };
        }

        return item;
      });
    });
  }

  function removeFromCart(productId) {
    setCart(function (prevCart) {
      return prevCart.filter(function (item) {
        return item.product.id !== productId;
      });
    });
  }

  let cartItemCount = 0;

  for (let i = 0; i < cart.length; i++) {
    cartItemCount = cartItemCount + cart[i].quantity;
  }

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar
        cartItemCount={cartItemCount}
        onCartClick={() => navigateTo('cart')}
        onLogoClick={() => navigateTo('listing')}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

        {currentView === 'listing' && (
          <ProductListing
            onProductClick={(product) => navigateTo('detail', product)}
            onAddToCart={addToCart}
          />
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => navigateTo('listing')}
            onAddToCart={(qty) => addToCart(selectedProduct, qty)}
            cart={cart}
            onGoToCart={() => navigateTo('cart')}
          />
        )}

        {currentView === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            onContinueShopping={() => navigateTo('listing')}
          />
        )}

      </main>
      {toastMessage ? <Toast message={toastMessage} /> : null}

      <Footer />

    </div>
  );
}

export default App;

