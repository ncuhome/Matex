import type { NodeApiProps } from '../../common';

interface MatexWindow extends Window, NodeApiProps {}

export const MatexWin: MatexWindow = window as unknown as MatexWindow;
