import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutSection } from '../../models/cv-data.interface';

@Component({
  selector: 'app-cv-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-about.component.html',
  styleUrl: './cv-about.component.css'
})
export class CvAboutComponent {
  @Input() aboutInfo?: AboutSection;
  @Input() isLoading = false;

  // Animation counters for statistics
  animateStatistic(targetValue: number, duration: number = 2000): number {
    // This would be enhanced with proper animation logic
    return targetValue;
  }
}
