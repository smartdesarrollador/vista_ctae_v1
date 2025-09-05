import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Testimonial } from '../../models/cv-data.interface';

@Component({
  selector: 'app-cv-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-testimonials.component.html',
  styleUrl: './cv-testimonials.component.css'
})
export class CvTestimonialsComponent implements OnInit, OnDestroy {
  @Input() testimonials: Testimonial[] = [];
  @Input() isLoading = false;

  currentIndex = 0;
  isPlaying = true;
  private autoPlayInterval?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  nextTestimonial(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  previousTestimonial(): void {
    this.currentIndex = this.currentIndex === 0 
      ? this.testimonials.length - 1 
      : this.currentIndex - 1;
  }

  goToTestimonial(index: number): void {
    this.currentIndex = index;
  }

  toggleAutoPlay(): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  private startAutoPlay(): void {
    if (!isPlatformBrowser(this.platformId) || this.testimonials.length <= 1) return;
    
    this.stopAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = window.setInterval(() => {
      if (this.isPlaying) {
        this.nextTestimonial();
      }
    }, 5000); // Change testimonial every 5 seconds
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = undefined;
    }
  }

  getTestimonialRatingStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push('☆');
    }
    
    // Fill remaining with empty stars (up to 5 total)
    while (stars.length < 5) {
      stars.push('☆');
    }
    
    return stars;
  }

  getCompanyInitials(companyName: string): string {
    if (!companyName) return 'C';
    return companyName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  formatTestimonialDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  }

  getAverageRating(): string {
    if (this.testimonials.length === 0) return '0.0';
    const totalRating = this.testimonials.reduce((sum, t) => sum + (t.rating || 5), 0);
    return (totalRating / this.testimonials.length).toFixed(1);
  }

  getCompanyCount(): number {
    return this.testimonials.filter(t => t.company).length;
  }
}