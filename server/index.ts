import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import { info } from './utils/log';

// const TestController = require('./controller/test');

const app = new Koa();

app.use(bodyParser());
// app.use(TestController.routes());
app.use(KoaStatic(process.cwd() + '/dist'));

export default app.listen(9099, () => {
  info('listen at port 9099');
});
