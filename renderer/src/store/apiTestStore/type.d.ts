export interface ApiTestKVProps {
  index: number;
  key: string;
  value: string;
}
export type updateApiTestHP = (index: number, key: string) => void;

export type ApiTestReturnType = [
  ApiTestKVProps[],
  updateApiTestHP,
  updateApiTestHP,
  (update: Omit<ApiTestKVProps, 'index'>) => void,
  (update: number) => void
];
