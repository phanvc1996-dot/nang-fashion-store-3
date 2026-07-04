import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import LoginModal from "./components/LoginModal"; // Import LoginModal mới

function App() {
  // Quản lý trạng thái Giỏ hàng
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("my_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Quản lý trạng thái Token đăng nhập từ localStorage
  const [token, setToken] = useState(() => {
    return localStorage.getItem("user_token") || null;
  });

  // Quản lý trạng thái đóng/mở Form Đăng nhập
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("my_cart", JSON.stringify(cart));
  }, [cart]);

  // Hàm xử lý khi Đăng nhập thành công
  const handleLoginSuccess = (userToken) => {
    localStorage.setItem("user_token", userToken);
    setToken(userToken);
    setIsLoginOpen(false); // Đóng modal luôn
  };

  // Hàm xử lý khi Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user_token");
    setToken(null);
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
      {/* Truyền các props cần thiết cho việc ẩn hiện Login/Logout vào Header */}
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
        />
      </section>

      {/* Điều kiện hiển thị Form Đăng nhập dạng Popup Modal */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </section>
  );
}

export default App;
