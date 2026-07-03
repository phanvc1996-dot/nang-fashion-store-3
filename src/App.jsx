import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart"; // 1. Import Component Giỏ hàng mới vào đây

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("my_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("my_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((item) => item.id === product.id);
      if (isExist) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }),
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <Header totalItems={totalItems} />

      {/* Bố cục lưới chia cột lớn */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        {/* Cột danh sách sản phẩm */}
        <section className="lg:col-span-3">
          <ProductList onAddToCart={addToCart} />
        </section>

        {/* Cột Giỏ hàng (Bây giờ chỉ gọn gàng thế này thôi) */}
        <Cart
          cart={cart}
          totalItems={totalItems}
          totalAmount={totalAmount}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
        />
      </section>
    </section>
  );
}

export default App;
