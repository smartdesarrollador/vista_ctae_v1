import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'intersection-observer';

// Initialize AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Configure AOS with custom settings
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false,
  offset: 100,
  delay: 0,
  anchorPlacement: 'top-bottom'
});

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
