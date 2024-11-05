/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        float: 'float 10s linear infinite',
      },
    },
  },
  safelist: [
    'bg-blue-50',
    'bg-green-50',
    'bg-red-50',
    'bg-purple-50',
    'hover:bg-blue-100',
    'hover:bg-green-100',
    'hover:bg-red-100',
    'hover:bg-purple-100',
    'text-blue-600',
    'text-green-600',
    'text-red-600',
    'text-purple-600',
  ],
  plugins: [],
};