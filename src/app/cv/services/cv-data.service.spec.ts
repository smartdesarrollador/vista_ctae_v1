import { TestBed } from '@angular/core/testing';
import { CvDataService } from './cv-data.service';
import { PersonalInfo, Experience, Education, SkillCategory, Project, Testimonial, ContactInfo } from '../models/cv-data.interface';

describe('CvDataService', () => {
  let service: CvDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return personal info', () => {
    service.getPersonalInfo().subscribe((personalInfo: PersonalInfo) => {
      expect(personalInfo).toBeTruthy();
      expect(personalInfo.fullName).toBeTruthy();
      expect(personalInfo.title).toBeTruthy();
      expect(personalInfo.email).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    });
  });

  it('should return experience list', () => {
    service.getExperience().subscribe((experiences: Experience[]) => {
      expect(experiences).toBeTruthy();
      expect(Array.isArray(experiences)).toBe(true);
      expect(experiences.length).toBeGreaterThan(0);
      
      // Test first experience structure
      const firstExp = experiences[0];
      expect(firstExp.company).toBeTruthy();
      expect(firstExp.position).toBeTruthy();
      expect(firstExp.startDate).toBeTruthy();
      expect(firstExp.description).toBeTruthy();
    });
  });

  it('should return skills by category', () => {
    service.getSkills().subscribe((skills: SkillCategory[]) => {
      expect(skills).toBeTruthy();
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThan(0);
      
      // Test skill structure
      const firstCategory = skills[0];
      expect(firstCategory.category).toBeTruthy();
      expect(Array.isArray(firstCategory.skills)).toBe(true);
    });
  });

  it('should provide data methods', () => {
    expect(typeof service.getPersonalInfo).toBe('function');
    expect(typeof service.getExperience).toBe('function');
    expect(typeof service.getSkills).toBe('function');
  });
});
