const saveLayout = async (ctx, next) => {
  const name = ctx.request.body.name || '';
  // eslint-disable-next-line
  console.log(name);
};

module.exports = {
  'POST /save': saveLayout,
};
