import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactInfo } from '../../models/cv-data.interface';

@Component({
  selector: 'app-cv-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cv-contact.component.html',
  styleUrl: './cv-contact.component.css'
})
export class CvContactComponent implements OnInit {
  @Input() contactInfo?: ContactInfo;
  @Input() isLoading = false;
  
  @Output() contactClick = new EventEmitter<void>();

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Initialize form
  }

  onContactClick(): void {
    this.contactClick.emit();
  }

  getContactIcon(type: string): string {
    switch (type?.toLowerCase()) {
      case 'email': return '📧';
      case 'phone': return '📱';
      case 'location': return '📍';
      case 'website': return '🌐';
      case 'linkedin': return '👤';
      case 'github': return '💻';
      case 'twitter': return '🐦';
      default: return '💬';
    }
  }

  copyToClipboard(text: string, type: string): void {
    if (isPlatformBrowser(this.platformId) && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        // Show success message (could be enhanced with toast notification)
        console.log(`${type} copiado al portapapeles: ${text}`);
      }).catch(err => {
        console.error('Error al copiar al portapapeles:', err);
      });
    }
  }

  openEmailClient(email?: string): void {
    if (isPlatformBrowser(this.platformId) && email) {
      window.location.href = `mailto:${email}`;
    }
  }

  dialPhone(phone?: string): void {
    if (isPlatformBrowser(this.platformId) && phone) {
      window.location.href = `tel:${phone}`;
    }
  }

  openCalendly(url?: string): void {
    if (isPlatformBrowser(this.platformId) && url) {
      window.open(url, '_blank');
    }
  }

  // Form handling methods
  onSubmitContactForm(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = false;
      this.submitSuccess = false;

      // Simulate form submission (in real app, this would send to a server)
      setTimeout(() => {
        try {
          const formData = this.contactForm.value;
          console.log('Formulario enviado:', formData);
          
          // Simulate email sending
          this.sendEmail(formData);
          
          this.submitSuccess = true;
          this.contactForm.reset();
        } catch (error) {
          this.submitError = true;
          console.error('Error al enviar formulario:', error);
        } finally {
          this.isSubmitting = false;
        }
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  private sendEmail(formData: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const subject = encodeURIComponent(`Contacto desde CV: ${formData.subject}`);
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Mensaje:\n${formData.message}`
      );
      
      const mailtoUrl = `mailto:${this.contactInfo?.email}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field && field.touched && field.errors) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} es requerido`;
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nombre',
      email: 'Email',
      subject: 'Asunto',
      message: 'Mensaje'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
