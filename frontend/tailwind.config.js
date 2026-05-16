module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0d0d1a',
          800: '#12121e',
          700: '#1a1a2e',
          600: '#222238',
          500: '#2e2e4a',
        },
        rose: {
          primary: '#BC4368',
          mid:     '#CA6889',
          light:   '#D88DA6',
        },
        silver: '#CCCCCC',
        snow:   '#E6E6E6',
      },
    },
  },
  plugins: [],
}
