module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'p': { margin: '0', padding: '0', fontSize: 'inherit', lineHeight: 'inherit' },
        'h1': { margin: '0', padding: '0', fontSize: 'inherit', fontWeight: 'normal' },
        // Add more elements as needed
      });
    }
  ],
}