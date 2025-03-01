/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      screens: {
        print: { raw: 'print' },
      },
    },
  },
  // Modern content configuration for Tailwind CSS v3.0
  safelist: [
    // Safelist any classes that might be dynamically generated
    { pattern: /^bg-/ },
    { pattern: /^text-/ },
    { pattern: /^border-/ },
    { pattern: /^hover:/ },
    { pattern: /^focus:/ },
  ],
  // Disable variants we're not using to reduce CSS size
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active', 'disabled'],
      textColor: ['active', 'disabled'],
    },
  },
  plugins: [],
};
