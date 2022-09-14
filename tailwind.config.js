/** @type {import('tailwindcss').Config} */
module.exports = {
  // // 移除生產環境下沒有使用到的樣式聲明
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
