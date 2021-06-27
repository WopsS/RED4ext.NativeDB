module.exports = {
    mode: "jit",
    darkMode: false,
    purge: [
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                "auto-fill": "auto 1fr"
            },
            gridTemplateRows: {
                "auto-fill": "auto 1fr"
            },
            fontFamily: {
                "mono": [ "'Fira Code'", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "'Liberation Mono'", "'Courier New'", "monospace" ]
            },
            colors: {
                "black-pearl": "#161b22"
            }
        }
    }
  }
