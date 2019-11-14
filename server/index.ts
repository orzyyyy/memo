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
app.use(DecoratorRouter(path.join(__dirname, 'controller')));
app.use(KoaStatic(joinWithRootPath('dist')));
app.use(CheckSqlTomlResource(joinWithRootPath('bin/resource/sql')));

server.listen(9099);

export { server };
