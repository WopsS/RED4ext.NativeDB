module.exports = function (config) {
    config.set({
        basePath: "",
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
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
            dir: require("path").join(__dirname, "./coverage/NativeDB"),
            subdir: ".",
            reporters: [{ type: "html" }, { type: "text-summary" }]
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
