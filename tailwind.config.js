/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      screens: {
        'lg': '1024px', // Ensure lg breakpoint is defined
      },
    },
  },
  plugins: [],
};
