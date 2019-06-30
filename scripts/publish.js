const ghpages = require('gh-pages');

ghpages.publish(
  'dist',
  {
    dotfiles: true,
    repo: 'https://github.com/orzyyyy/memo.git',
    user: {
      name: 'orzyyyy',
      email: 'orzyyyy@gmail.com',
    },
  },
  error => {
    console.error(error.message);
  },
);
