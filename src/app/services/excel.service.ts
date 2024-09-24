import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export class ExcelService {
  
    exportToExcel(data:any): void {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'People');
      const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'people.xlsx');
    }
  }