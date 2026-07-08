import React from "react";

function Cart({
  cart,
  totalItems,
  totalAmount,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout, // 1. Nhận thêm prop xử lý thanh toán từ App.jsx
}) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex justify-between items-center">
        Giỏ hàng
        <span className="bg-blue-600 text-white text-xs px-2.5 py-0.5 rounded-full">
          {totalItems}
        </span>
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">
          Giỏ hàng trống rỗng
        </p>
      ) : (
        <>
          {/* Danh sách các sản phẩm trong giỏ */}
          <section className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {cart.map((item) => (
              <section
                key={item.id}
                className="flex gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-contain bg-white p-1 border rounded"
                />
                <section className="flex-grow min-w-0">
                  <h4 className="text-xs font-semibold text-gray-800 truncate">
                    {item.title}
                  </h4>
                  <p className="text-sm text-orange-600 font-bold">
                    ${item.price}
                  </p>

                  {/* Cụm tăng giảm số lượng & nút xóa */}
                  <section className="flex items-center justify-between mt-2">
                    <section className="flex items-center gap-2 bg-gray-100 px-2 py-0.5 rounded">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-gray-500 hover:text-gray-700 font-bold text-xs px-1 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-gray-500 hover:text-gray-700 font-bold text-xs px-1 cursor-pointer"
                      >
                        +
                      </button>
                    </section>

                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                    >
                      Xóa
                    </button>
                  </section>
                </section>
              </section>
            ))}
          </section>

          {/* Phần tổng tiền & nút thanh toán */}
          <section className="border-t border-gray-200 mt-4 pt-4">
            <section className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-500">
                Tổng thanh toán:
              </span>
              <span className="text-xl font-bold text-orange-600">
                ${totalAmount.toFixed(2)}
              </span>
            </section>
            {/* 2. Gán sự kiện click kích hoạt onCheckout */}
            <button
              onClick={onCheckout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
            >
              Tiến hành thanh toán
            </button>
          </section>
        </>
      )}
    </section>
  );
}

export default Cart;
