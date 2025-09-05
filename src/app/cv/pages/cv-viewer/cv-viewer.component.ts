import { Component, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import AOS from 'aos';

import { CVData, PersonalInfo, AboutSection, Experience, Education, SkillCategory, Project, ContactInfo, Testimonial } from '../../models/cv-data.interface';
import { CvDataService } from '../../services/cv-data.service';
import { CvThemeService } from '../../services/cv-theme.service';
import { CvHeaderComponent } from '../../components/cv-header/cv-header.component';
import { CvAboutComponent } from '../../components/cv-about/cv-about.component';
import { CvExperienceComponent } from '../../components/cv-experience/cv-experience.component';
import { CvEducationComponent } from '../../components/cv-education/cv-education.component';
import { CvSkillsComponent } from '../../components/cv-skills/cv-skills.component';
import { CvProjectsComponent } from '../../components/cv-projects/cv-projects.component';
import { CvTestimonialsComponent } from '../../components/cv-testimonials/cv-testimonials.component';
import { CvContactComponent } from '../../components/cv-contact/cv-contact.component';

@Component({
  selector: 'app-cv-viewer',
  standalone: true,
  imports: [
    CommonModule,
    CvHeaderComponent,
    CvAboutComponent,
    CvExperienceComponent,
    CvEducationComponent,
    CvSkillsComponent,
    CvProjectsComponent,
    CvTestimonialsComponent,
    CvContactComponent
  ],
  templateUrl: './cv-viewer.component.html',
  styleUrl: './cv-viewer.component.css'
})
export class CvViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  // Data properties
  cvData?: CVData;
  personalInfo?: PersonalInfo;
  aboutInfo?: AboutSection;
  experience: Experience[] = [];
  education: Education[] = [];
  skills: SkillCategory[] = [];
  projects: Project[] = [];
  testimonials: Testimonial[] = [];
  contactInfo?: ContactInfo;

  // State properties
  isLoading = true;
  currentTheme = 'default';

  // Lifecycle management
  private destroy$ = new Subject<void>();

  constructor(
    private cvDataService: CvDataService,
    private themeService: CvThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadCVData();
    this.initializeTheme();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAOS();
      this.setupNavigation();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCVData(): void {
    this.cvDataService.getCVData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.cvData = data;
          this.personalInfo = data.personalInfo;
          this.aboutInfo = data.about;
          this.experience = data.experience;
          this.education = data.education;
          this.skills = data.skills;
          this.projects = data.portfolio;
          this.testimonials = data.testimonials;
          this.contactInfo = data.contact;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading CV data:', error);
          this.isLoading = false;
        }
      });
  }

  private initializeTheme(): void {
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme.name;
        this.themeService.applyTheme(theme);
      });
  }

  private initializeAOS(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 0
    });
  }

  private setupNavigation(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const navDots = document.querySelectorAll('.cv-nav-dot');
    const sections = document.querySelectorAll('.cv-section');

    // Set up intersection observer for navigation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.updateActiveNavDot(sectionId);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    sections.forEach(section => {
      observer.observe(section);
    });

    // Set up click handlers for navigation dots
    navDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const targetSection = sections[index];
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  private updateActiveNavDot(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const navDots = document.querySelectorAll('.cv-nav-dot');
    const sectionMap: { [key: string]: number } = {
      'header': 0,
      'about': 1,
      'experience': 2,
      'education': 3,
      'skills': 4,
      'projects': 5,
      'testimonials': 6,
      'contact': 7
    };

    navDots.forEach((dot, index) => {
      dot.classList.remove('active');
      if (index === sectionMap[sectionId]) {
        dot.classList.add('active');
      }
    });
  }

  // Template helper methods
  getSkillPercentage(level: number): string {
    return `${level}%`;
  }

  onContactClick(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  onDownloadPDF(): void {
    // Placeholder for PDF generation functionality
    console.log('Download PDF functionality will be implemented in Phase 3');
  }

  onProjectDemo(project: Project): void {
    if (isPlatformBrowser(this.platformId) && project.demoUrl) {
      window.open(project.demoUrl, '_blank');
    }
  }

  onProjectGithub(project: Project): void {
    if (isPlatformBrowser(this.platformId) && project.githubUrl) {
      window.open(project.githubUrl, '_blank');
    }
  }
}
