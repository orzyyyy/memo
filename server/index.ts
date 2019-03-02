const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const KoaStatic = require('koa-static');
const generateMapping = require('./generateMapping');
const router = require('./router');

generateMapping();
app.use(bodyParser());
app.use(router.routes());
app.use(KoaStatic(process.cwd()));

app.listen(9099);
// eslint-disable-next-line
console.log('listen at port 9099');

module.exports = {
  app: app
};
