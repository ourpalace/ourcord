/* eslint-disable object-curly-spacing*/
import { EventEmitter } from 'events';

// eslint-disable-next-line require-jsdoc
export default function handleErr(err: string, emitter: EventEmitter): boolean {
  return emitter.emit('error', err);
}
