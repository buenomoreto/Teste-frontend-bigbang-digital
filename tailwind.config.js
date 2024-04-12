export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    },
    container: {
      screens: {
        xl: '1133px'
      }
    }
  },
  plugins: []
}
