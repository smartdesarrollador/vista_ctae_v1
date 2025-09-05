import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models/cv-data.interface';

@Component({
  selector: 'app-cv-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-experience.component.html',
  styleUrl: './cv-experience.component.css'
})
export class CvExperienceComponent {
  @Input() experience: Experience[] = [];
  @Input() isLoading = false;

  formatDateRange(startDate: string, endDate?: string): string {
    const start = new Date(startDate).toLocaleDateString('es-ES', { 
      month: 'short', 
      year: 'numeric' 
    });
    const end = endDate ? 
      new Date(endDate).toLocaleDateString('es-ES', { 
        month: 'short', 
        year: 'numeric' 
      }) : 'Presente';
    
    return `${start} - ${end}`;
  }

  calculateDuration(startDate: string, endDate?: string): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    if (diffMonths < 12) {
      return `${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const remainingMonths = diffMonths % 12;
      let result = `${years} año${years > 1 ? 's' : ''}`;
      if (remainingMonths > 0) {
        result += ` ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
      }
      return result;
    }
  }

  getCompanyInitials(companyName: string): string {
    if (!companyName) return 'C';
    return companyName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }
}
