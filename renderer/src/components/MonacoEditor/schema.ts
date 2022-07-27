export interface SchemaProps {
  type: string;
  properties: Object;
}

export interface SchemaArrProps {
  url: string;
  fileMatch?: string[];
  schema: SchemaProps;
}

export const defaultSchema: SchemaArrProps[] | any = [
  {
    url: 'http://myserver/name.json',
    fileMatch: ['*.json'],
    schema: {
      type: 'object',
      properties: {
        name: {
          enum: ['alice', 'lqd1434']
        },
        id: {
          enum: [1, 2, 3]
        }
      }
    }
  }
];
