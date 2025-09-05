import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/cv-data.interface';

@Component({
  selector: 'app-cv-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-projects.component.html',
  styleUrl: './cv-projects.component.css'
})
export class CvProjectsComponent {
  @Input() projects: Project[] = [];
  @Input() isLoading = false;
  
  @Output() projectDemo = new EventEmitter<Project>();
  @Output() projectGithub = new EventEmitter<Project>();

  onProjectDemo(project: Project): void {
    this.projectDemo.emit(project);
  }

  onProjectGithub(project: Project): void {
    this.projectGithub.emit(project);
  }

  getProjectStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getProjectTypeIcon(type?: string): string {
    switch (type?.toLowerCase()) {
      case 'web': return '🌐';
      case 'mobile': return '📱';
      case 'desktop': return '💻';
      case 'api': return '🔧';
      case 'library': return '📚';
      default: return '⚡';
    }
  }

  getCompletedProjects(): number {
    return this.projects.filter(project => 
      project.status?.toLowerCase() === 'completed'
    ).length;
  }

  getActiveProjects(): number {
    return this.projects.filter(project => 
      project.status?.toLowerCase() === 'in-progress' || !project.endDate
    ).length;
  }

  getTotalTechnologies(): number {
    const allTechs = new Set();
    this.projects.forEach(project => {
      project.technologies.forEach(tech => allTechs.add(tech));
    });
    return allTechs.size;
  }
}
