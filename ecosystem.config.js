module.exports = {
  apps: [
    {
      name: 'interferon',
      script: 'bin/www',
      watch: true,
      ignore_watch: [
        '.git',
        '.gitignore',
        'ecosystem.config.js',
        'node_modules',
        'public',
        'views',
        'logs',
      ],
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
    },
  ],
};
