import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import LoginModal from "./components/LoginModal";
import CheckoutModal from "./components/CheckoutModal"; // 1. Import CheckoutModal mới vào

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("my_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("user_token") || null;
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // 2. Khai báo state đóng mở của cổng Thanh toán QR
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("my_cart", JSON.stringify(cart));
  }, [cart]);

  const handleLoginSuccess = (userToken) => {
    localStorage.setItem("user_token", userToken);
    setToken(userToken);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    setToken(null);
  };

  // 3. Hàm xử lý khi bấm hoàn tất thanh toán thành công
  const handlePaymentSuccess = () => {
    alert("Cảm ơn bạn đã mua hàng! Đơn hàng hệ thống đang được xử lý.");
    setCart([]); // Xóa sạch giỏ hàng ở bộ nhớ State
    setIsCheckoutOpen(false); // Đóng hộp thoại
  };

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
      <Header
        token={token}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        <section className="lg:col-span-3">
          <ProductList onAddToCart={addToCart} />
        </section>

        <Cart
          cart={cart}
          totalItems={totalItems}
          totalAmount={totalAmount}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onCheckout={() => setIsCheckoutOpen(true)} // 4. Kích hoạt mở Modal thanh toán tại đây
        />
      </section>

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* 5. Khối điều kiện render giao diện cổng quét mã QR */}
      {isCheckoutOpen && (
        <CheckoutModal
          totalAmount={totalAmount}
          onClose={() => setIsCheckoutOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </section>
  );
}

export default App;
