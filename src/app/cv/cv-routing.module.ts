import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvViewerComponent } from './pages/cv-viewer/cv-viewer.component';

export const CV_ROUTES: Routes = [
  {
    path: '',
    component: CvViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(CV_ROUTES)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
