/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // важно!
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}' // все файлы, где есть классы
  ],
  theme: { extend: {} },
  plugins: [],
}
