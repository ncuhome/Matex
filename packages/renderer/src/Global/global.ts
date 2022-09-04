import { NodeApiProps } from '/@common/global';

interface MatexWindow {
	NodeApi:NodeApiProps
}

export const MatexWin: MatexWindow = window as any as MatexWindow;
