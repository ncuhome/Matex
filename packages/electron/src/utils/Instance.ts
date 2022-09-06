import Emittery from 'emittery';
import _matexhttp from 'matexhttp';
import { promisify } from 'util';

export const MatexHttp = promisify(_matexhttp);
export const emitter = new Emittery();
