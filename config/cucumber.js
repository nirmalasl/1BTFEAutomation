module.exports = {
    default: {
        tags: "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "features/sauceDemoLogin.feature",
            "features/sauceDemoAddProduct.feature"
        ],
        require: [
            "features/step_definitions/*.js",
            "features/support/*.js"
        ],
        format: [
            "progress-bar",
            ["html", "reports/cucumber-report.html"],
            ["json", "reports/cucumber-report.json"]
        ],
        order: "defined"
        
    }
};