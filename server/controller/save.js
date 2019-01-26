const saveLayout = async (ctx, next) => {
  const body = ctx.request.body;
  // eslint-disable-next-line
  console.log(body);
  ctx.response.body = 'result';
};

module.exports = {
  'POST /save': saveLayout,
};
