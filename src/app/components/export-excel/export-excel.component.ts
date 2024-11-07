import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-export-excel',
  standalone: true,
  imports: [],
  templateUrl: './export-excel.component.html',
  styleUrl: './export-excel.component.css'
})
export class ExportExcelComponent {

    constructor(private dataService: DataService) {}
  
    exportToExcel() {
      this.dataService.exportCustomersToExcel().subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'customers.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error exporting customers to Excel:', error);
      });
    }
  }
  
