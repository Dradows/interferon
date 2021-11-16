module.exports = {
  apps: [
    {
      script: 'bin/www',
      watch: true,
      ignore_watch: ['.git', 'node_modules', 'public', 'views','logs'],
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
    },
  ],
};
