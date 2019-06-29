const { format } = require('date-fns');
const chalk = require('chalk');
import { getTargetResource } from './resource';

const { log } = getTargetResource('server');
const getTimestamp = () => `[${format(new Date(), log.dateFormat)}] `;
const logger = (color: string, prefix: string, content: string) => {
  const message = getTimestamp() + prefix + content;
  // tslint:disable-next-line: no-console
  console.log(chalk[color](message));
};

export const success = (text: string) =>
  logger('greenBright', 'success => ', text);

export const error = (text: string) => logger('red', '', text);

export const info = (text: string) => logger('yellowBright', '', text);

export const trace = (text: string) => logger('cyanBright', '', text);
