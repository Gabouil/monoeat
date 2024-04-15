module.exports = {
    apps: [{
    name: "ApiMonoeat",
        script: "/home/debian/www/Monoeat/source/backend/index.js",
        env: {
            NODE_ENV: "development",
        },
        port:3000,
        env_test: {
            NODE_ENV: "test",
        },
        env_staging: {
            NODE_ENV: "staging",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }, ],

    deploy: {
        production: {
            user: "debian",
            host: "141.94.22.241",
            ref: "origin/main",
            repo: "git@github.com:Gabouil/monoeat.git",
            path: "/home/debian/www/Monoeat",
            'pre-deploy-local': '',
            "post-deploy": "cd backend && npm install && pm2 startOrRestart apimonoeat.config.js --env production",
            'pre-setup': ''
        }
    }
}