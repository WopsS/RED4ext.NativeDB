const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    mode: "jit",
    darkMode: false,
    purge: ["./src/**/*.{html,ts}"],
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
