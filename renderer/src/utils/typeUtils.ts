export const rawTypes = ['image', 'audio', 'video', 'pdf', 'word'];
export const EditorAbleType = ['json', 'text', 'html', 'xml', 'javascript'];

export const judgementType = (typeStr: string) => {
  if (typeStr.includes('text/html')) {
    return 'html';
  } else if (typeStr.includes('text/plain')) {
    return 'text';
  } else if (typeStr.includes('application/xml')) {
    return 'xml';
  } else if (typeStr.includes('image/')) {
    return 'image';
  } else if (typeStr.includes('audio/')) {
    return 'audio';
  } else if (typeStr.includes('video/')) {
    return 'video';
  } else if (typeStr.includes('application/json')) {
    return 'json';
  } else if (typeStr.includes('application/pdf')) {
    return 'pdf';
  } else if (typeStr.includes('application/msword')) {
    return 'word';
  } else {
    return 'other';
  }
};
