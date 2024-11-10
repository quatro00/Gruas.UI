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



    exportTableToExcel(dataList: any[], fileName: string = 'ExportedData'): void {
      if (!dataList || dataList.length === 0) {
        console.warn('No data available to export');
        return;
      }
    
      // Obtener las claves de los objetos para usarlas como encabezados
      const headers = Object.keys(dataList[0]);
    
      // Agregar encabezados personalizados (si se necesitan)
      const formattedData = dataList.map(item => {
        const formattedItem = {};
        headers.forEach(header => {
          formattedItem[header] = item[header];
        });
        return formattedItem;
      });
    
      // Crear la hoja de Excel con los encabezados
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData, { header: headers });
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Data': worksheet },
        SheetNames: ['Data']
      };
    
      // Exportar el archivo Excel
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(data, `${fileName}.xlsx`);
    }

  }