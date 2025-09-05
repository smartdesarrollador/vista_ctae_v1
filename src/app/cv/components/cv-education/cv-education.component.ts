import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Education } from '../../models/cv-data.interface';

@Component({
  selector: 'app-cv-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-education.component.html',
  styleUrl: './cv-education.component.css'
})
export class CvEducationComponent {
  @Input() education: Education[] = [];
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

  getEducationTypeIcon(field?: string): string {
    const fieldLower = field?.toLowerCase() || '';
    if (fieldLower.includes('ingeniería') || fieldLower.includes('engineering')) {
      return '🔧';
    }
    if (fieldLower.includes('informática') || fieldLower.includes('computer') || fieldLower.includes('software')) {
      return '💻';
    }
    if (fieldLower.includes('marketing') || fieldLower.includes('business')) {
      return '📈';
    }
    if (fieldLower.includes('diseño') || fieldLower.includes('design')) {
      return '🎨';
    }
    if (fieldLower.includes('cloud') || fieldLower.includes('nube')) {
      return '☁️';
    }
    if (fieldLower.includes('certificación') || fieldLower.includes('certification')) {
      return '🏆';
    }
    return '🎓';
  }

  getEducationLevelColor(degree?: string): string {
    const degreeLower = degree?.toLowerCase() || '';
    if (degreeLower.includes('doctorado') || degreeLower.includes('phd')) {
      return 'from-purple-500 to-purple-600';
    }
    if (degreeLower.includes('master') || degreeLower.includes('maestría')) {
      return 'from-blue-500 to-blue-600';
    }
    if (degreeLower.includes('grado') || degreeLower.includes('licenciatura') || degreeLower.includes('bachelor')) {
      return 'from-green-500 to-green-600';
    }
    if (degreeLower.includes('certificación') || degreeLower.includes('certification')) {
      return 'from-orange-500 to-orange-600';
    }
    if (degreeLower.includes('curso') || degreeLower.includes('course')) {
      return 'from-teal-500 to-teal-600';
    }
    return 'from-gray-500 to-gray-600';
  }

  getTotalYearsOfStudy(): number {
    if (this.education.length === 0) return 0;
    
    let totalMonths = 0;
    this.education.forEach(edu => {
      const start = new Date(edu.startDate);
      const end = edu.endDate ? new Date(edu.endDate) : new Date();
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      totalMonths += diffMonths;
    });
    
    return Math.round(totalMonths / 12);
  }
}
