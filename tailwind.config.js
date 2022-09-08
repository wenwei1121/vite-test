/** @type {import('tailwindcss').Config} */
module.exports = {
  // 移除生產環境下沒有使用到的樣式聲明
  purge: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
