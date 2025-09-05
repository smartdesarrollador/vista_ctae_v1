import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./paginas/auth/login/login.component').then((m) => m.LoginComponent),
        title: 'Iniciar sesión',
      },
      {
        path: 'register',
        loadComponent: () => import('./paginas/auth/register/register.component').then((m) => m.RegisterComponent),
        title: 'Registrarse',
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./paginas/auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
        title: 'Recuperar contraseña',
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./paginas/auth/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
        title: 'Restablecer contraseña',
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '', // CV is now the root
    loadChildren: () => import('./cv/cv-routing.module').then(m => m.CvRoutingModule),
    data: { title: 'CV Digital' }
  },
  {
    path: '**',
    loadComponent: () => import('./paginas/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];