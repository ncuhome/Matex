export interface MetaData {
  version: string;
  size: string;
  os: 'win' | 'mac';
  update_time: string;
}

export interface AfterCheckRes extends MetaData {
  isUpdate: boolean;
}
