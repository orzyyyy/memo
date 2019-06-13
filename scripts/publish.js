const ghpages = require('gh-pages');

ghpages.publish('dist', {
  dotfiles: true,
  repo: 'https://github.com/zy410419243/memo.git',
  user: {
    name: 'zy410419243',
    email: 'zy410419243@gmail.com',
  },
});
console.log('published');
