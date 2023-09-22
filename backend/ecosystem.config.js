require('dotenv').config({ path: './back.env' });

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
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Username/repository.git',
      path: DEPLOY_PATH,
      'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build',
    },
  },
};
