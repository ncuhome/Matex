export interface ApiTestHPProps {
  index: number;
  key: string;
  value: string;
}
export type updateApiTestHP = (index: number, key: string) => void;

export type ApiTestReturnType = [
  ApiTestHPProps[],
  updateApiTestHP,
  updateApiTestHP,
  (update: Omit<ApiTestHPProps, 'index'>) => void,
  (update: number) => void
];
