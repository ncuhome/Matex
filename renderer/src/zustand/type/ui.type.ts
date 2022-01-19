export interface CollapseOptions {
  collapse: boolean;
  openCollapse: () => void;
  closeCollapse: () => void;
}

export interface PreRouterTypes {
  preRoute: string;
  setPreRoute: (preRoute: string) => void;
}
