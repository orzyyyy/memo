import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import Router from './router';

const app = new Koa();
const { router } = Router;

app.use(bodyParser());
app.use(router.routes());
app.use(KoaStatic(process.cwd() + '/dist'));

export default app.listen(9099, () => {
  // tslint:disable-next-line: no-console
  console.log('listen at port 9099');
});
