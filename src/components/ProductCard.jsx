import React from "react";

// Nhận prop product và onAddToCart
function ProductCard({ product, onAddToCart }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      {/* Khung chứa ảnh sản phẩm */}
      <section className="h-52 p-6 flex justify-center items-center bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </section>

      {/* Thông tin sản phẩm */}
      <section className="p-4 flex flex-col flex-grow">
        {/* Thể loại */}
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
          {product.category}
        </span>

        {/* Tiêu đề */}
        <h3 className="text-sm font-semibold text-gray-800 mb-4 line-clamp-2 h-10">
          {product.title}
        </h3>

        {/* Hàng chứa Giá và Nút bấm nằm dưới đáy card */}
        <section className="mt-auto flex justify-between items-center pt-2">
          <span className="text-xl font-bold text-orange-600">
            ${product.price}
          </span>
          {/* Lắng nghe sự kiện onClick để thực hiện thêm sản phẩm */}
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Thêm vào giỏ
          </button>
        </section>
      </section>
    </section>
  );
}

export default ProductCard;
