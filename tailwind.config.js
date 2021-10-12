module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  prefix: 'tw-',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        'charcoal': '#2F3E46',
        'dark-matcha-green': '#84A98C'
      },
      colors: {
        'dark-green': '#354F52',
        'charcoal': '#2F3E46',
        'matcha-green': '#CAD2C5',
        'dark-matcha-green': '#84A98C'
      },
      boxShadow: {
        'top-xl-dark-green': '0 -20px 0 0 #354F52'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
