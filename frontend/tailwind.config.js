/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          850: "#0f172a",
          875: "#0a0f1f",
        },
      },
      boxShadow: {
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.4)",
      },
      spacing: {
        4.5: "1.125rem",
      },
    },
  },
  plugins: [],
};
