import { TestBed } from '@angular/core/testing';

import { CvThemeService } from './cv-theme.service';

describe('CvThemeService', () => {
  let service: CvThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
