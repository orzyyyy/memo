import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import { joinWithRootPath } from './utils/common';
import { createServer } from 'http';
import IO from 'socket.io';
import path from 'path';
import DecoratorRouter from './middleware/DecoratorRouter';
import CheckSqlTomlResource from './middleware/CheckSqlTomlResource';

const app = new Koa();
const server = createServer(app.callback());
const io = IO(server);

io.on('connection', socket => {
  socket.on('refresh', () => {
    io.emit('refresh');
  });
});

app.use(BodyParser());
app.use(
  DecoratorRouter(path.join(__dirname, 'controller'), controllerPath => {
    if (controllerPath.includes('ToyController') && process.env.BUILD_ENV !== 'toy') {
      return false;
    }
    return true;
  }),
);
app.use(KoaStatic(joinWithRootPath('dist')));
if (process.env.BUILD_ENV === 'toy') {
  app.use(CheckSqlTomlResource(joinWithRootPath('server/resource/sql')));
}

server.listen(9099);

export { server };
