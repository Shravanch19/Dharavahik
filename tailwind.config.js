/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#282C34',
        secondary: '#3B3F4F',
        accent: '#61DAFB',
        highlight:'#fdf2f8',
        background: '#1C1C1C',
        textPrimary: '#F5F5F5',
        textSecondary: '#A5A5A5',
        border: '#4B4B4B',
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
    
  },
  plugins: [],
};
