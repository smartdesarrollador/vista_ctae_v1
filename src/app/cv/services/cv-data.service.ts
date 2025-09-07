import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CVData,
  PersonalInfo,
  AboutSection,
  Experience,
  Education,
  SkillCategory,
  Project,
  Testimonial,
  ContactInfo,
  ThemeConfig,
} from '../models/cv-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CvDataService {
  constructor() {}

  // Datos mock para desarrollo
  private mockPersonalInfo: PersonalInfo = {
    fullName: 'Jeans Enrique Malon Reyna',
    title: 'Desarrollador Full Stack Senior',
    location: 'Lima, Perú',
    email: 'sistema5000smart@gmail.com',
    phone: '955365043',
    website: 'https://portafolio.smartdigitaltec.com',
    profileImage: 'assets/foto/perfil.jpg',
    bio: 'Especializado en desarrollo web moderno con Angular, React, Laravel y diseño centrado en el usuario',
    socialLinks: [
      {
        platform: 'whatsapp',
        url: 'https://wa.me/51955365043',
        icon: '📱',
      },
      {
        platform: 'facebook',
        url: 'https://www.facebook.com/jeansenrique.malonreyna',
        icon: '👤',
      },
      {
        platform: 'portfolio',
        url: 'https://portafolio.smartdigitaltec.com',
        icon: '🌐',
      },
      {
        platform: 'email',
        url: 'mailto:sistema5000smart@gmail.com',
        icon: '📧',
      },
    ],
  };

  private mockAbout: AboutSection = {
    description:
      'Soy un desarrollador full stack apasionado con más de 9 años de experiencia especializado en desarrollo web moderno con Angular, Laravel y tecnologías frontend. Me enfoco en crear soluciones innovadoras y escalables que mejoren la experiencia del usuario y optimicen los procesos de negocio.',
    yearsExperience: 9,
    projectsCompleted: 50,
    clientsSatisfied: 30,
    technologies: [
      'Angular',
      'Laravel',
      'TypeScript',
      'PHP',
      'MySQL',
      'JavaScript',
      'HTML5',
      'CSS3',
    ],
  };

  private mockExperience: Experience[] = [
    {
      id: 1,
      company: 'Enfocus Soluciones Integrales',
      position: 'Senior Full Stack Developer',
      startDate: '2018-11',
      endDate: undefined,
      location: 'Lima, Perú',
      description:
        'Desarrollo de aplicaciones web enterprise usando Angular, Laravel y tecnologías modernas. Liderazgo técnico de proyectos complejos y mentoreo de desarrolladores.',
      technologies: [
        'Angular',
        'Laravel',
        'MySQL',
        'TypeScript',
        'PHP',
        'TailwindCSS',
        'Vue.js',
      ],
      achievements: [
        'Lideré el desarrollo de 20+ proyectos web exitosos',
        'Incrementé la eficiencia del equipo en un 50%',
        'Implementé arquitecturas escalables y mantenibles',
        'Mentoré a 12+ desarrolladores junior y semi-senior',
        'Optimicé procesos de desarrollo reduciendo tiempos en 40%',
      ],
      companyLogo: '/assets/images/companies/enfocus.png',
    },
    {
      id: 2,
      company: 'Websoluciones',
      position: 'Frontend Developer',
      startDate: '2015-05',
      endDate: '2018-10',
      location: 'Lima, Perú',
      description:
        'Desarrollo de interfaces de usuario modernas y responsive. Especialización en JavaScript, HTML5, CSS3 y frameworks frontend.',
      technologies: [
        'JavaScript',
        'HTML5',
        'CSS3',
        'jQuery',
        'Bootstrap',
        'SASS',
        'Gulp',
      ],
      achievements: [
        'Desarrollé 35+ sitios web responsive y modernos',
        'Mejoré la experiencia de usuario en un 65%',
        'Implementé estándares web y buenas prácticas',
        'Reduje el tiempo de carga de sitios web en 45%',
        'Colaboré con equipos de diseño UX/UI',
      ],
      companyLogo: '/assets/images/companies/websoluciones.png',
    },
    {
      id: 3,
      company: 'WebDev Solutions',
      position: 'Full Stack Developer',
      startDate: '2014-07',
      endDate: '2015-04',
      location: 'Lima, Perú',
      description:
        'Desarrollo de aplicaciones web completas usando PHP y MySQL. Primeros pasos en el desarrollo full stack profesional.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'jQuery'],
      achievements: [
        'Desarrollé 15+ aplicaciones web desde cero',
        'Aprendí y dominé tecnologías web fundamentales',
        'Colaboré en proyectos de diferentes sectores',
        'Contribuí al crecimiento técnico del equipo',
      ],
      companyLogo: '/assets/images/companies/webdev-solutions.png',
    },
  ];

  private mockEducation: Education[] = [
    {
      id: 1,
      institution: 'Universidad Federico Villarreal',
      degree: 'Ingeniería Informática',
      field: 'Ingeniería de Software y Sistemas',
      startDate: '2010-02',
      endDate: '2015-11',
      location: 'Lima, Perú',
      gpa: '15.8/20',
      description:
        'Formación integral en desarrollo de software, análisis de sistemas y tecnologías de la información.',
      achievements: [
        'Especialización en desarrollo web y bases de datos',
        'Proyecto de tesis en sistemas de gestión empresarial',
        'Participación en proyectos de investigación tecnológica',
        'Mención honorífica en cursos de programación',
      ],
    },
    {
      id: 2,
      institution: 'Platzi',
      degree: 'Escuela de JavaScript',
      field: 'Desarrollo Frontend',
      startDate: '2020-01',
      endDate: '2020-08',
      location: 'Online',
      description:
        'Especialización completa en JavaScript, React, Angular y tecnologías frontend modernas.',
    },
    {
      id: 3,
      institution: 'Laravel Perú',
      degree: 'Laravel Certified Developer',
      field: 'Desarrollo Backend',
      startDate: '2019-06',
      endDate: '2019-09',
      location: 'Lima, Perú',
      description:
        'Certificación oficial en desarrollo de aplicaciones web con Laravel PHP Framework.',
    },
    {
      id: 4,
      institution: 'Google Cloud',
      degree: 'Google Cloud Associate',
      field: 'Cloud Computing',
      startDate: '2023-01',
      endDate: '2023-03',
      location: 'Online',
      description:
        'Certificación en implementación y gestión de soluciones en Google Cloud Platform.',
    },
  ];

  private mockSkills: SkillCategory[] = [
    {
      category: 'Frontend',
      skills: [
        { name: 'Angular', level: 95, years: 4, icon: 'angular' },
        { name: 'React', level: 88, years: 3, icon: 'react' },
        { name: 'Vue.js', level: 75, years: 2, icon: 'vue' },
        { name: 'TypeScript', level: 92, years: 4, icon: 'typescript' },
        { name: 'HTML5/CSS3', level: 98, years: 5, icon: 'html5' },
        { name: 'TailwindCSS', level: 90, years: 2, icon: 'tailwindcss' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 90, years: 4, icon: 'nodejs' },
        { name: 'Laravel', level: 85, years: 3, icon: 'laravel' },
        { name: 'Python', level: 80, years: 2, icon: 'python' },
        { name: 'Express.js', level: 88, years: 3, icon: 'express' },
      ],
    },
    {
      category: 'Bases de Datos',
      skills: [
        { name: 'MongoDB', level: 85, years: 3, icon: 'mongodb' },
        { name: 'PostgreSQL', level: 82, years: 3, icon: 'postgresql' },
        { name: 'MySQL', level: 90, years: 4, icon: 'mysql' },
        { name: 'Redis', level: 75, years: 2, icon: 'redis' },
      ],
    },
    {
      category: 'DevOps & Cloud',
      skills: [
        { name: 'AWS', level: 85, years: 2, icon: 'aws' },
        { name: 'Docker', level: 88, years: 3, icon: 'docker' },
        { name: 'Kubernetes', level: 70, years: 1, icon: 'kubernetes' },
        { name: 'Git', level: 95, years: 5, icon: 'git' },
      ],
    },
  ];

  private mockProjects: Project[] = [
    {
      id: 1,
      title: 'SmartCommerce - E-commerce Peruana',
      description:
        'Plataforma completa de e-commerce con integración a Culqi/Niubiz, gestión de inventarios y panel administrativo avanzado.',
      technologies: ['Angular', 'Laravel', 'MySQL', 'TailwindCSS', 'API Culqi'],
      imageUrl: '/assets/images/projects/smartcommerce.jpg',
      demoUrl: 'https://portafolio.smartdigitaltec.com',
      githubUrl: 'https://github.com/jeans-enrique/smartcommerce',
      startDate: '2023-01',
      endDate: '2023-09',
      featured: true,
    },
    {
      id: 2,
      title: 'GestorPro - Sistema de Gestión Empresarial',
      description:
        'Sistema integral de gestión empresarial con módulos de facturación, inventarios, CRM y reportes analíticos en tiempo real.',
      technologies: ['Angular', 'Laravel', 'MySQL', 'Chart.js', 'Bootstrap'],
      imageUrl: '/assets/images/projects/gestorpro.jpg',
      demoUrl: 'https://gestorpro-demo.smartdigitaltec.com',
      githubUrl: 'https://github.com/jeans-enrique/gestorpro',
      startDate: '2022-06',
      endDate: '2023-01',
      featured: true,
    },
    {
      id: 3,
      title: 'ClinicaApp - Gestión Médica',
      description:
        'Aplicación web para gestión de clínicas con citas médicas, historiales clínicos, recetas digitales y reportes médicos.',
      technologies: ['React', 'Laravel', 'MySQL', 'PDF Generator', 'Tailwind'],
      imageUrl: '/assets/images/projects/clinicapp.jpg',
      demoUrl: 'https://clinicapp-demo.smartdigitaltec.com',
      githubUrl: 'https://github.com/jeans-enrique/clinicapp',
      startDate: '2022-01',
      endDate: '2022-06',
      featured: true,
    },
    {
      id: 4,
      title: 'RestaurantePOS - Sistema de Ventas',
      description:
        'Sistema POS para restaurantes con gestión de mesas, comandas, facturación y control de inventario de cocina.',
      technologies: ['Angular', 'PHP', 'MySQL', 'Socket.io', 'PWA'],
      imageUrl: '/assets/images/projects/restaurante-pos.jpg',
      demoUrl: 'https://restaurantepos-demo.smartdigitaltec.com',
      githubUrl: 'https://github.com/jeans-enrique/restaurante-pos',
      startDate: '2021-08',
      endDate: '2021-12',
      featured: false,
    },
  ];

  private mockTestimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      position: 'CTO',
      company: 'InnovateTech Peru',
      testimonial:
        'Jeans es un desarrollador excepcional. Su capacidad técnica y creatividad han sido fundamentales para el éxito de nuestros proyectos. Siempre entrega código de alta calidad y supera las expectativas.',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      rating: 5,
    },
    {
      id: 2,
      name: 'María Gonzales',
      position: 'Product Manager',
      company: 'DigitalSoft Lima',
      testimonial:
        'Trabajar con Jeans fue una experiencia increíble. Su atención al detalle y comprensión de los requisitos del negocio hacen que sea muy fácil colaborar con él. Excelente profesional.',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b612b08c?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      rating: 5,
    },
    {
      id: 3,
      name: 'Roberto Silva',
      position: 'Lead Developer',
      company: 'TechHub Solutions',
      testimonial:
        'Jeans tiene una curva de aprendizaje impresionante. En poco tiempo dominó nuestro stack tecnológico y comenzó a contribuir significativamente al proyecto. Muy recomendado.',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      rating: 5,
    },
    {
      id: 4,
      name: 'Ana Rodriguez',
      position: 'UI/UX Designer',
      company: 'Creative Agency Peru',
      testimonial:
        'La colaboración con Jeans fue perfecta. Entiende perfectamente los diseños y los implementa con precisión. Su conocimiento en Angular y React es sobresaliente.',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      rating: 5,
    },
    {
      id: 5,
      name: 'Diego Martinez',
      position: 'CEO',
      company: 'StartupLima',
      testimonial:
        'Jeans desarrolló nuestra plataforma web desde cero. Su profesionalismo, puntualidad y calidad técnica superaron nuestras expectativas. Definitivamente lo recomendaríamos.',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      rating: 5,
    },
  ];

  private mockContact: ContactInfo = {
    email: 'sistema5000smart@gmail.com',
    phone: '955365043',
    location: 'Lima, Perú',
    availability: 'Disponible para proyectos remotos y presenciales',
    preferredContact: 'phone',
    message:
      '¿Tienes un proyecto interesante? ¡Me encantaría colaborar contigo y crear algo increíble juntos!',
    responseTime: '24-48 horas',
    socialLinks: [
      {
        platform: 'whatsapp',
        url: 'https://wa.me/51955365043',
        icon: '📱',
      },
      {
        platform: 'facebook',
        url: 'https://www.facebook.com/jeansenrique.malonreyna',
        icon: '👤',
      },
    ],
  };

  private mockTheme: ThemeConfig = {
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    accentColor: '#10b981',
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    fontFamily: 'Inter, sans-serif',
    isDarkMode: false,
  };

  // Métodos públicos para obtener datos
  getCVData(): Observable<CVData> {
    const cvData: CVData = {
      personalInfo: this.mockPersonalInfo,
      about: this.mockAbout,
      experience: this.mockExperience,
      education: this.mockEducation,
      skills: this.mockSkills,
      portfolio: this.mockProjects,
      testimonials: this.mockTestimonials,
      contact: this.mockContact,
      theme: this.mockTheme,
    };

    return of(cvData);
  }

  getPersonalInfo(): Observable<PersonalInfo> {
    return of(this.mockPersonalInfo);
  }

  getAboutSection(): Observable<AboutSection> {
    return of(this.mockAbout);
  }

  getExperience(): Observable<Experience[]> {
    return of(this.mockExperience);
  }

  getEducation(): Observable<Education[]> {
    return of(this.mockEducation);
  }

  getSkills(): Observable<SkillCategory[]> {
    return of(this.mockSkills);
  }

  getProjects(): Observable<Project[]> {
    return of(this.mockProjects);
  }

  getFeaturedProjects(): Observable<Project[]> {
    const featured = this.mockProjects.filter((project) => project.featured);
    return of(featured);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return of(this.mockTestimonials);
  }

  getContactInfo(): Observable<ContactInfo> {
    return of(this.mockContact);
  }

  getThemeConfig(): Observable<ThemeConfig> {
    return of(this.mockTheme);
  }
}
