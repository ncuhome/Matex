export interface MetaData {
  version: string;
  size: string;
  os: 'win' | 'mac';
}

export interface AfterCheckRes extends MetaData {
  isUpdate: boolean;
}
