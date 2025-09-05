import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCategory } from '../../models/cv-data.interface';

@Component({
  selector: 'app-cv-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-skills.component.html',
  styleUrl: './cv-skills.component.css'
})
export class CvSkillsComponent implements OnInit, AfterViewInit {
  @Input() skills: SkillCategory[] = [];
  @Input() isLoading = false;
  
  animatedSkills: { [key: string]: boolean } = {};

  ngOnInit(): void {
    // Initialize animation states
    this.skills.forEach(category => {
      category.skills.forEach(skill => {
        this.animatedSkills[`${category.category}-${skill.name}`] = false;
      });
    });
  }

  ngAfterViewInit(): void {
    // Trigger animations with delay
    setTimeout(() => {
      this.startProgressAnimations();
    }, 500);
  }

  private startProgressAnimations(): void {
    this.skills.forEach((category, categoryIndex) => {
      category.skills.forEach((skill, skillIndex) => {
        const key = `${category.category}-${skill.name}`;
        setTimeout(() => {
          this.animatedSkills[key] = true;
        }, (categoryIndex * 200) + (skillIndex * 100));
      });
    });
  }

  getSkillLevelText(level: number): string {
    if (level >= 90) return 'Experto';
    if (level >= 75) return 'Avanzado';
    if (level >= 50) return 'Intermedio';
    if (level >= 25) return 'Básico';
    return 'Principiante';
  }

  getSkillColorClass(level: number): string {
    if (level >= 90) return 'from-green-500 to-emerald-600';
    if (level >= 75) return 'from-blue-500 to-blue-600';
    if (level >= 50) return 'from-yellow-500 to-orange-500';
    if (level >= 25) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-red-600';
  }

  getTotalSkills(): number {
    return this.skills.reduce((total, category) => total + category.skills.length, 0);
  }

  getExpertSkills(): number {
    return this.skills.reduce((total, category) => {
      return total + category.skills.filter(skill => skill.level >= 90).length;
    }, 0);
  }

  getAverageSkillLevel(): number {
    const allSkills = this.skills.flatMap(category => category.skills);
    if (allSkills.length === 0) return 0;
    
    const totalLevel = allSkills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(totalLevel / allSkills.length);
  }

  getTechnologyIcon(skillName: string): string {
    const name = skillName.toLowerCase();
    
    // Frontend Technologies
    if (name.includes('angular')) return '🅰️';
    if (name.includes('react')) return '⚛️';
    if (name.includes('vue')) return '💚';
    if (name.includes('javascript') || name.includes('js')) return '🟨';
    if (name.includes('typescript') || name.includes('ts')) return '🔷';
    if (name.includes('html')) return '🌐';
    if (name.includes('css')) return '🎨';
    if (name.includes('sass') || name.includes('scss')) return '💜';
    if (name.includes('tailwind')) return '🎭';
    if (name.includes('bootstrap')) return '🅱️';
    
    // Backend Technologies
    if (name.includes('node')) return '💚';
    if (name.includes('python')) return '🐍';
    if (name.includes('java')) return '☕';
    if (name.includes('php')) return '🐘';
    if (name.includes('laravel')) return '🔴';
    if (name.includes('express')) return '🚀';
    if (name.includes('spring')) return '🍃';
    if (name.includes('.net') || name.includes('dotnet')) return '🔷';
    if (name.includes('ruby')) return '💎';
    
    // Databases
    if (name.includes('mysql')) return '🐬';
    if (name.includes('postgresql') || name.includes('postgres')) return '🐘';
    if (name.includes('mongodb') || name.includes('mongo')) return '🍃';
    if (name.includes('redis')) return '🔴';
    if (name.includes('sqlite')) return '💾';
    if (name.includes('oracle')) return '🏛️';
    
    // Cloud & DevOps
    if (name.includes('aws')) return '☁️';
    if (name.includes('azure')) return '🔷';
    if (name.includes('google cloud') || name.includes('gcp')) return '☁️';
    if (name.includes('docker')) return '🐳';
    if (name.includes('kubernetes')) return '⚙️';
    if (name.includes('jenkins')) return '👷';
    if (name.includes('gitlab')) return '🦊';
    if (name.includes('github')) return '🐙';
    if (name.includes('git')) return '📝';
    
    // Mobile
    if (name.includes('flutter')) return '🐦';
    if (name.includes('react native')) return '📱';
    if (name.includes('ionic')) return '⚡';
    if (name.includes('android')) return '🤖';
    if (name.includes('ios') || name.includes('swift')) return '🍎';
    
    // Tools & Others
    if (name.includes('figma')) return '🎨';
    if (name.includes('photoshop')) return '🖼️';
    if (name.includes('linux')) return '🐧';
    if (name.includes('windows')) return '🪟';
    if (name.includes('mac')) return '🍎';
    
    // Default icon
    return '⚡';
  }
}
