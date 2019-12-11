module.exports = {
  apps: [
    {
      name: 'memo-server',
      script: 'bin/index.js',
      instances: 1,
      autorestart: true,
      watch: ['bin', 'dist'],
      max_memory_restart: '512M',
      out_file: 'server/log/app-out.log',
      error_file: 'server/log/app-error.log',
    },
  ],
};
