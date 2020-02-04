module.exports = {
  apps: [
    {
      name: 'memo-server',
      script: 'bin/index.js',
      instances: 1,
      autorestart: true,
      watch: ['bin'],
      max_memory_restart: '512M',
      out_file: 'server/log/pm2-out.log',
      error_file: 'server/log/pm2-error.log',
      log_date_format: 'yyyy-MM-DD HH:mm Z',
    },
  ],
};
