/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        glow: {
          purple: '#6d28d9',
          blue: '#0ea5e9',
          pink: '#db2777',
          gold: '#eab308',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        handwritten: ['"Cinzel Decorative"', '"Playfair Display"', 'serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 4s infinite alternate',
        'float': 'floatAnim 6s ease-in-out infinite',
        'float-slow': 'floatAnim 9s ease-in-out infinite',
        'float-fast': 'floatAnim 3.5s ease-in-out infinite',
        'glitch': 'glitchAnim 1s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(109, 40, 217, 0.3)) drop-shadow(0 0 10px rgba(14, 165, 233, 0.2))' },
          '100%': { filter: 'drop-shadow(0 0 15px rgba(109, 40, 217, 0.7)) drop-shadow(0 0 25px rgba(14, 165, 233, 0.5))' },
        },
        floatAnim: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(1.5deg)' },
        },
        glitchAnim: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        }
      }
    },
  },
  plugins: [],
}
