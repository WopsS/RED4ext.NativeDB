module.exports = function (config) {
    config.set({
        restartOnFileChange: true,
        browsers: ["Chrome", "Firefox"],
        reporters: ["progress", "kjhtml"],
        frameworks: ["jasmine", "@angular-devkit/build-angular"],

        client: {
            clearContext: false
        },

        jasmineHtmlReporter: {
            suppressAll: true
        },

        coverageReporter: {
            dir: require("path").join(__dirname, "./coverage"),
            subdir: ".",
            reporters: [{ type: "html" }, { type: "text-summary" }],
            check: {
                global: {
                    statements: 95,
                    branches: 95,
                    functions: 95,
                    lines: 95
                }
            }
        },

        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-firefox-launcher"),
            require("karma-jasmine-html-reporter"),
            require("karma-coverage"),
            require("@angular-devkit/build-angular/plugins/karma")
        ]
    });
};
