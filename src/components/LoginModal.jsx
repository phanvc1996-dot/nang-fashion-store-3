import React, { useState } from "react";
import { validatePassword } from "../utils/validate"; // 1. Import hàm kiểm tra điều kiện vào đây

function LoginModal({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 2. Tiến hành kiểm tra điều kiện mật khẩu ở Frontend trước
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errorMsg); // Hiển thị lỗi điều kiện ra màn hình
      return; // Chặn lại không cho chạy xuống đoạn gọi API bên dưới
    }

    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Tài khoản hoặc mật khẩu không chính xác!");
      }

      const data = await response.json();
      onLoginSuccess(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 animate-fade-in">
      <section className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Đăng Nhập
        </h2>
        <p className="text-xs text-center text-gray-400 mb-6">
          Sử dụng tài khoản hệ thống hệ sinh thái FakeStore
        </p>

        {/* Khu vực hiển thị thông báo lỗi (Lỗi điều kiện hoặc lỗi API) */}
        {error && (
          <section className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 font-medium border border-red-100">
            ⚠️ {error}
          </section>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <section>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: mor_2314"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
          </section>

          <section>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              placeholder="Nhập mật khẩu bảo mật"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
            {/* Thẻ hướng dẫn nhỏ bên dưới ô input giúp tối ưu UI/UX */}
            <p className="text-[11px] text-gray-400 mt-1">
              Yêu cầu: Tối thiểu 8 ký tự, gồm chữ Hoa, chữ Thường, Số và ký tự
              đặc biệt.
            </p>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors cursor-pointer disabled:bg-gray-400"
          >
            {loading ? "Đang xác thực..." : "Đăng Nhập"}
          </button>
        </form>

        {/* Gợi ý tài khoản để test (Vì mật khẩu mặc định của Fakestore `83r5^_` đã thỏa mãn các điều kiện trên) */}
        <section className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-500 space-y-1">
          <p className="font-semibold text-blue-600">
            Tài khoản mẫu hợp lệ hệ thống:
          </p>
          <p>
            User:{" "}
            <span className="font-mono bg-gray-200 px-1 rounded">mor_2314</span>
          </p>
          <p>
            Pass:{" "}
            <span className="font-mono bg-gray-200 px-1 rounded">83r5^_</span>
          </p>
        </section>
      </section>
    </section>
  );
}

export default LoginModal;
