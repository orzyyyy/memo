import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import Router from './router';
import { info } from './utils/log';

const app = new Koa();
const { router } = Router;

app.use(bodyParser());
app.use(router.routes());
app.use(KoaStatic(process.cwd() + '/dist'));

export default app.listen(9099, () => {
  info('listen at port 9099');
});
