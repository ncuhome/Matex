export type ResDataType = 'Plain Text' | 'JSON' | 'File' | 'Form Data';

export interface ApiData {
  id: number;
  route: string;
  type: ResDataType;
  resData: any;
  desc: string;
}
