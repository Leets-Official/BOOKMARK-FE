// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Pretendard', 'Arial', 'sans-serif'], // Pretendard를 기본으로 설정
    },
    extend: {
      fontWeight: {
        'regular': '400',
        'medium': '500',
        'semibold': '600',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
