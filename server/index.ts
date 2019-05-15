const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const KoaStatic = require('koa-static');
const router = require('./router');

app.use(bodyParser());
app.use(router.routes());
app.use(KoaStatic(process.cwd() + '/dist'));

const server = app.listen(9099);
// tslint:disable-next-line: no-console
console.log('listen at port 9099');

module.exports = {
  server: server,
};
