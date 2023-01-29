/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "media",

  theme: {
    extend: {
      animation: {
        wheel: "wheel 1s infinite",
        borders: "borders 20s infinite",
      },
      keyframes: {
        wheel: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'translateY(10%)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)'
          }
        },
        borders: {
          '0%, 100%': {
            'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '50%': {
            'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%'
          }
        }
      },
      colors: {
        primary: "var(--primary)",
        "primary-1": "var(--primary-1)",
        "primary-translucent": "var(--primary-translucent)",
      },
      backgroundImage: {
        "primary-gradient": "var(--primary-gradient)",
      },
    },
    minHeight: {
      2: "40px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
