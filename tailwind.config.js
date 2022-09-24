const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            fontFamily: {
                mono: [
                    "'Fira Code VF'",
                    "'Fira Code'",
                    ...defaultTheme.fontFamily.mono
                ]
            }
        }
    }
};
