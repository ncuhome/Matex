import * as React from 'react';
import { SVGProps } from 'react';

const FolderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="svgIcon"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    {...props}
  >
    <path d="M912 208H427.872l-50.368-94.176A63.936 63.936 0 0 0 321.056 80H112c-35.296 0-64 28.704-64 64v736c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64V272c0-35.296-28.704-64-64-64zm-800-64h209.056l68.448 128H912v97.984c-.416 0-.8-.128-1.216-.128H113.248c-.416 0-.8.128-1.248.128V144zm0 736v-96l1.248-350.144L912 435.072V784h.064v96H112z" />
  </svg>
);

export default FolderIcon;
