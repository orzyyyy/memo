const get = async ctx => {
  // let name = ctx.params.name;

  ctx.response.body = '<h1>test</h1>';
};

module.exports = {
  'GET /': get,
};
