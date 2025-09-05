import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfo } from '../../models/cv-data.interface';

@Component({
  selector: 'app-cv-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-header.component.html',
  styleUrl: './cv-header.component.css'
})
export class CvHeaderComponent {
  @Input() personalInfo?: PersonalInfo;
  @Input() isLoading = false;
  
  @Output() contactClick = new EventEmitter<void>();
  @Output() downloadPDF = new EventEmitter<void>();

  onContactClick(): void {
    this.contactClick.emit();
  }

  onDownloadPDF(): void {
    this.downloadPDF.emit();
  }

  getInitials(fullName?: string): string {
    if (!fullName) return 'CV';
    return fullName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }
}
