import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit, OnDestroy {
  @Input('appLazyLoad') src: string = '';
  @Input() alt: string = '';
  @Input() placeholder: string = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+';
  
  private observer?: IntersectionObserver;
  private isLoaded = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupLazyLoading();
    } else {
      // For SSR, load image immediately
      this.loadImage();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupLazyLoading(): void {
    // Set placeholder
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.placeholder);
    this.renderer.addClass(this.el.nativeElement, 'cv-img-loading');
    
    if (this.alt) {
      this.renderer.setAttribute(this.el.nativeElement, 'alt', this.alt);
    }

    // Setup intersection observer
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isLoaded) {
          this.loadImage();
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    if (this.isLoaded) return;

    const img = new Image();
    img.onload = () => {
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.src);
      this.renderer.removeClass(this.el.nativeElement, 'cv-img-loading');
      this.renderer.addClass(this.el.nativeElement, 'cv-transition');
      this.isLoaded = true;

      if (this.observer) {
        this.observer.unobserve(this.el.nativeElement);
      }
    };

    img.onerror = () => {
      // Fallback to a default error image
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.placeholder);
      this.renderer.removeClass(this.el.nativeElement, 'cv-img-loading');
      this.isLoaded = true;

      if (this.observer) {
        this.observer.unobserve(this.el.nativeElement);
      }
    };

    img.src = this.src;
  }
}