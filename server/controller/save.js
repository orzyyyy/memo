const saveLayout = async (ctx, next) => {
  const body = ctx.request.body;
  ctx.response.body = body.layout;
};

module.exports = {
  'POST /save': saveLayout,
};
