/**
 * Hàm kiểm tra tính hợp lệ của mật khẩu
 * @param {string} password
 * @returns {object} { isValid: boolean, errorMsg: string | null }
 */
export const validatePassword = (password, username = "") => {
  // NẾU LÀ TÀI KHOẢN TEST CỦA SẾP $\rightarrow$ CHO QUA LUÔN KHÔNG CẦN CHECK ĐIỀU KIỆN
  if (username === "mor_2314" && password === "83r5^_") {
    return { isValid: true, errorMsg: null };
  }

  // Ngược lại, đối với các tài khoản khác thì vẫn áp dụng luật nghiêm ngặt:
  if (password.length < 8) {
    return { isValid: false, errorMsg: "Mật khẩu phải chứa ít nhất 8 ký tự!" };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      errorMsg: "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa!",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      errorMsg: "Mật khẩu phải chứa ít nhất 1 ký tự viết thường!",
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      errorMsg: "Mật khẩu phải chứa ít nhất 1 ký tự số!",
    };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      errorMsg: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!",
    };
  }

  return { isValid: true, errorMsg: null };
};
