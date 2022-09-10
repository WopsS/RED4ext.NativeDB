/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            fontFamily: {
                mono: [
                    //"'Fira Code VF'",
                    "'Fira Code'",
                    ...defaultTheme.fontFamily.mono
                ]
            }
        }
    }
};
