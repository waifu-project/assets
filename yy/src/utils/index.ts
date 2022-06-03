import FileSaver from './filesave.js'
export default function isObject(val: any) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

export function exportFile(fileName: string, content: string){
  var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
  (FileSaver as any).saveAs(blob, fileName);
}
