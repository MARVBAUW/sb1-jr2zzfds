/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: {
          50: '#EAEAEA',
          100: '#BEBEBF',
          200: '#929293',
          300: '#666667',
          400: '#3D3D3E',
          500: '#141415',
          600: '#121213',
          700: '#0E0E0F',
          800: '#0B0B0C',
          900: '#080809',
        },
      },
      boxShadow: {
        'glass': '0 4px 24px -1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glass-hover': '0 4px 32px -1px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'background-shift': 'backgroundShift 15s linear infinite',
        'aurora-shift': 'auroraShift 10s linear infinite',
        'reflection': 'reflection 8s linear infinite',
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
        'widest': '0.03em',
      },
      lineHeight: {
        'tighter': '1.1',
        'tight': '1.25',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '1.75',
      },
    },
  },
  plugins: [],
};