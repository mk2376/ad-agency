/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "cover-image": "url('/assets/img/cover_background.svg')",
                "page-background": "url('/assets/img/page_background.svg')",
            },
            colors: {
                primary: {
                    500: "#d6375d",
                    600: "#c3284c",
                    700: "#ab2c4a",
                    800: "#891c35",
                },
            },
        },
    },
    plugins: [],
};
