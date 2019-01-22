const saveLayout = async (ctx, next) => {
  var name = ctx.request.body.name || '',
    password = ctx.request.body.password || '';
  if (name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
};

const test = async ctx => {
  var name = ctx.request.body.name || '';

  ctx.response.body = `<h1>Hello ${name}!</h1>`;
};

module.exports = {
  'POST /save': saveLayout,
  'GET /get/:name': test,
};
