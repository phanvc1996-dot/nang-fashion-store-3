import React from "react";

function CheckoutModal({ totalAmount, onClose, onPaymentSuccess }) {
  // Cấu hình thông tin tài khoản nhận tiền
  const BANK_ID = "MB";
  const ACCOUNT_NO = "123456789999";
  const ACCOUNT_NAME = "NGUYEN VAN A";
  const TEMPLATE = "qr_only";

  const addInfo = `THANH TOAN DON HANG ${Math.floor(1000 + Math.random() * 9000)}`;
  const EXCHANGE_RATE = 25000;
  const amountInVND = Math.round(totalAmount * EXCHANGE_RATE);

  const vietQrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${amountInVND}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

  return (
    <section className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 animate-fade-in">
      {/* 1. Sửa lớp CSS ở đây: 
        - max-h-[calc(100vh-2rem)]: Giới hạn chiều cao modal không bao giờ vượt quá chiều cao màn hình trừ đi khoảng cách đệm.
        - flex flex-col: Biến modal thành một chiếc hộp flexbox hướng dọc để quản lý các phần con bên trong.
      */}
      <section className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden relative">
        {/* Tiêu đề Modal (Cố định ở trên cùng) */}
        <header className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white text-center flex-shrink-0">
          <h3 className="text-lg font-bold">Mã Quét QR Thanh Toán</h3>
          <p className="text-[11px] opacity-90 mt-0.5">
            Hệ thống chuyển khoản tự động VietQR
          </p>
        </header>

        {/* 2. Khu vực nội dung ở giữa (Tự động co giãn và sinh thanh cuộn nếu quá dài)
          - flex-grow: Tự động chiếm khoảng trống còn lại.
          - overflow-y-auto: Chỉ sinh thanh cuộn dọc cho duy nhất khu vực này khi nội dung quá dài.
          - pr-2: Chừa khoảng trống bên phải để thanh cuộn hiển thị đẹp hơn.
        */}
        <section className="p-5 space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {/* Khu vực hiển thị số tiền thanh toán (Đưa lên trên để đập vào mắt người dùng trước) */}
          <section className="text-center bg-orange-50 p-3 rounded-xl border border-orange-100">
            <p className="text-xs text-gray-500 font-medium">
              Tổng tiền cần thanh toán:
            </p>
            <p className="text-xl font-black text-orange-600 mt-0.5">
              {amountInVND.toLocaleString("vi-VN")} đ
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              (Tỷ giá quy đổi: $1 = 25.000đ)
            </p>
          </section>

          {/* Khu vực hiển thị ảnh QR (Thu nhỏ nhẹ kích thước max-w từ 260px xuống 220px) */}
          <figure className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-gray-200 rounded-xl bg-white max-w-[220px] mx-auto shadow-inner">
            <img
              src={vietQrUrl}
              alt="Mã quét QR thanh toán VietQR"
              className="w-full h-auto object-contain transition-all duration-300 hover:scale-105"
            />
            <figcaption className="text-[10px] text-gray-400 text-center mt-2 font-medium">
              Sử dụng ứng dụng Ngân hàng (App Banking) bất kỳ để quét mã
            </figcaption>
          </figure>

          {/* Nội dung chi tiết đơn hàng */}
          <section className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl text-xs border border-gray-100">
            <section>
              <p className="text-gray-400 text-[10px]">Ngân hàng:</p>
              <p className="font-bold text-gray-800">{BANK_ID}</p>
            </section>
            <section>
              <p className="text-gray-400 text-[10px]">Số tài khoản:</p>
              <p className="font-bold text-gray-800 font-mono tracking-wider">
                {ACCOUNT_NO}
              </p>
            </section>
            <section>
              <p className="text-gray-400 text-[10px]">Chủ tài khoản:</p>
              <p className="font-bold text-gray-800 uppercase truncate">
                {ACCOUNT_NAME}
              </p>
            </section>
            <section>
              <p className="text-gray-400 text-[10px]">
                Nội dung chuyển khoản:
              </p>
              <p
                className="font-bold text-orange-600 font-mono select-all"
                title="Click để copy"
              >
                {addInfo}
              </p>
            </section>
          </section>
        </section>

        {/* 3. Thanh điều hướng chân Modal (Luôn luôn cố định ở đáy Modal)
          - flex-shrink-0: Đảm bảo phần này không bao giờ bị bóp méo hay che khuất.
        */}
        <footer className="bg-gray-50 p-4 flex gap-3 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Hủy thanh toán
          </button>
          <button
            onClick={onPaymentSuccess}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-md hover:shadow-green-200 cursor-pointer"
          >
            Tôi đã chuyển khoản xong
          </button>
        </footer>
      </section>
    </section>
  );
}

export default CheckoutModal;
