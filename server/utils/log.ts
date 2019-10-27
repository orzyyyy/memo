/* eslint-disable no-console */
import chalk, { Chalk } from 'chalk';
import { format } from 'date-fns';
import { getTargetResource } from './resource';

const { log } = getTargetResource('server');
const getTimestamp = () => `[${format(new Date(), log.dateFormat)}] `;
const logger = (colorFunc: Chalk, prefix: string, content: string) => {
  const message = getTimestamp() + prefix + content;
  console.log(colorFunc(message));
};

export const success = (text: string) => logger(chalk.greenBright, '', text);

export const error = (text: string) => logger(chalk.red, '', text);

export const info = (text: string) => logger(chalk.yellowBright, '', text);

export const trace = (text: string) => logger(chalk.cyanBright, '', text);
