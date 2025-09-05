import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvViewerComponent } from './pages/cv-viewer/cv-viewer.component';
import { CvDataService } from './services/cv-data.service';
import { CvThemeService } from './services/cv-theme.service';

@NgModule({
  imports: [
    CommonModule,
    CvRoutingModule,
    CvViewerComponent
  ],
  providers: [
    CvDataService,
    CvThemeService
  ]
})
export class CvModule { }
