

interface MatexWindow extends Window {
	NODE_ENV:string
}

export const MatexWin: MatexWindow = window as any as MatexWindow;
