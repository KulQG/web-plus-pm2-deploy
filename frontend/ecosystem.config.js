require("dotenv").config({ path: ".env.deploy" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/master",
} = process.env;

module.exports = {
  apps: [],
  deploy: {
    user: DEPLOY_USER,
    host: DEPLOY_HOST,
    ref: DEPLOY_REF,
    repo: "https://github.com/KulQG/web-plus-pm2-deploy",
    path: DEPLOY_PATH,
    "post-deploy": "cd ~/dev/frontend/source/frontend/ && npm i && npm run build",
  },
};
