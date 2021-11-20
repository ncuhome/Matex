export interface MockData {
  port: string;
  route: string;
  type: 'Plain Text' | 'JSON' | 'File' | 'Form Data';
  data: string;
}
