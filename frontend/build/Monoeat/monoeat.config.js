module.exports = {
    apps: [{
        name: "Monoeat",
        script: "/home/debian/www/Monoeat/source/frontend/build/Monoeat/index.js",
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
    }, ],

    deploy: {
        production: {
            user: "debian",
            host: "141.94.22.241",
            ref: "origin/main",
            repo: "git@github.com:Gabouil/monoeat.git",
            path: "/home/debian/www/Monoeat",
            'pre-deploy-local': '',
            "post-deploy": "cd .\\frontend\\ && npm install && npm run build && cd build/Portfolio && npm install && pm2 startOrRestart ecosystem.config.js --env production",
            'pre-setup': ''
        }
    }
}