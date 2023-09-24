require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
  DATABASE_HOST,
  JWT_SECRET,
  NODE_ENV,
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
      // key: '~/.ssh/id_ed25519.pub',
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/KulQG/web-plus-pm2-deploy',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd ./dev/backend/ && npm i && npm run build',
    },
  },
};
