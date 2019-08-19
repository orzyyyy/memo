import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import fs from 'fs-extra';
import { info } from './utils/log';
import { joinWithRootPath } from './utils/common';
import { createServer } from 'http';
import IO from 'socket.io';
import { updateSider } from './utils/document';

updateSider();

const app = new Koa();
const server = createServer(app.callback());
const io = IO(server);

io.on('connection', socket => {
  socket.on('refresh', () => {
    io.emit('refresh');
  });
});

const initRouter = (targetApp: Koa) => {
  fs.readdirSync(joinWithRootPath('bin/controller'))
    .filter((filePath: string) => filePath.endsWith('.js'))
    .map((controllerPath: string) => {
      const controller = joinWithRootPath(['bin/controller', controllerPath]);
      targetApp.use(require(controller).default.routes());
    });
};

app.use(bodyParser());
initRouter(app);
app.use(KoaStatic(joinWithRootPath('dist')));

server.listen(9099, () => {
  info('listen at http://localhost:9099');
});

export { server };
