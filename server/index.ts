import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import { joinWithRootPath } from './utils/common';
import { createServer } from 'http';
import IO from 'socket.io';
import path from 'path';
import DecoratorRouter from './middleware/DecoratorRouter';
import { info } from './utils/log';
import { getTargetResource } from './utils/resource';
const config = getTargetResource('server');

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

const port = config.server.port;
server.listen(port);
info(`listen at ${port}.`);

export { server };
