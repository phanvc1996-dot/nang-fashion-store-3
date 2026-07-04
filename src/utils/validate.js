/**
 * Hàm kiểm tra tính hợp lệ của mật khẩu
 * @param {string} password
 * @returns {object} { isValid: boolean, errorMsg: string | null }
 */
export const validatePassword = (password) => {
  if (password.length < 8) {
    return { isValid: false, errorMsg: "Mật khẩu phải chứa ít nhất 8 ký tự!" };
  }

  // Kiểm tra ít nhất 1 ký tự viết hoa
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      errorMsg: "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa!",
    };
  }

  // Kiểm tra ít nhất 1 ký tự viết thường
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      errorMsg: "Mật khẩu phải chứa ít nhất 1 ký tự viết thường!",
    };
  }

  // Kiểm tra ít nhất 1 ký tự số
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      errorMsg: "Mật khẩu phải chứa ít nhất 1 ký tự số!",
    };
  }

  // Kiểm tra ít nhất 1 ký tự đặc biệt (!@#$%^&*...)
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      errorMsg: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!",
    };
  }

  return { isValid: true, errorMsg: null };
};
