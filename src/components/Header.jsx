import React from "react";

function Header({ token, onLogout, onOpenLogin }) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 gap-4">
      <section className="text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
          Nắng Fashion Store
        </h1>
        <p className="text-gray-400 text-sm">
          Dự án cửa hàng thời trang & đồng hồ đầu tay
        </p>
      </section>

      {/* Khu vực nút chức năng Đăng nhập / Đăng xuất */}
      <section>
        {token ? (
          <section className="flex items-center gap-4">
            <section className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-600">
                Đang hoạt động
              </span>
            </section>
            <button
              onClick={onLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Đăng xuất
            </button>
          </section>
        ) : (
          <button
            onClick={onOpenLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Đăng nhập hệ thống
          </button>
        )}
      </section>
    </header>
  );
}

export default Header;
