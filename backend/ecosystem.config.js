require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
  DATABASE_HOST,
  JWT_SECRET,
  NODE_ENV,
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/app.js',
      env_production: {
        NODE_ENV,
        DATABASE_HOST,
        JWT_SECRET,
      },
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd ~/dev/backend/source/backend/ && npm i && npm run build && pm2 restart ./ecosystem.config.js && pm2 save',
    },
  },
};
