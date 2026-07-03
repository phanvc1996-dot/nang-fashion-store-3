import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

// Nhận prop onAddToCart từ App.jsx
function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu từ server");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="flex justify-center items-center py-20 text-xl font-semibold text-gray-600">
        Đang tải danh sách sản phẩm...
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex justify-center items-center py-20 text-xl font-semibold text-red-500">
        Đã có lỗi xảy ra: {error}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        // Truyền tiếp hàm onAddToCart xuống cho ProductCard
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
}

export default ProductList;
