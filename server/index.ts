import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import { joinWithRootPath } from './utils/common';
import { createServer } from 'http';
import IO from 'socket.io';
import path from 'path';
import { getTargetResource } from './utils/resource';
import { configure, getLogger } from 'log4js';

configure({
  appenders: {
    output: { type: 'file', filename: 'server/log/access.log' },
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['output', 'console'], level: 'ALL' },
  },
});

// DecoratorRouter need a logger, so it should not export before logger
import DecoratorRouter from './middleware/DecoratorRouter';

const logger = getLogger('server/index.ts');
const config = getTargetResource('server');
const buildEnv = process.env.BUILD_ENV;

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

const port = buildEnv === 'dev' ? config.server.devPort : config.server.prodPort;
buildEnv !== 'test' && server.listen(port);

logger.info(`listen at http://localhost:${port}/`);

export { server, getLogger };
