/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/componetsFrondend/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/panel/**/*.{js,ts,jsx,tsx,mdx}",

    "./app/panel/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    screens: {
      sm: "412px",
      md: "768px",
      lg: "1424px"
    },
    extend: {
      colors: {
        primaryColor: "#005683",
        primaryColorLight: "#00A3E4",
        secondaryColor: "#332f2c",
        paragraphColor: "#888",
        whiteColor: "#D8D9DB",
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "0.5rem"
      }
    }
  },
  plugins: [],
};
