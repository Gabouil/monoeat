module.exports = {
    apps: [{
        name: "Monoeat",
        script: "/home/debian/www/Monoeat",
        env: {
            NODE_ENV: "development",
        },
        port:5001,
        env_test: {
            NODE_ENV: "test",
        },
        env_staging: {
            NODE_ENV: "staging",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}