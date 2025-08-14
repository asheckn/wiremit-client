import { Routes } from '@angular/router';
import {Login} from './features/auth/login/login';
import {Register} from './features/auth/register/register';
import {Landing} from './features/landing/landing';
import {Dashboard} from './features/dashboard/dashboard';
import {authGuard} from './core/guards/auth-guard';

export const routes: Routes = [
  {path: '', component: Landing},
  {path: 'sign-in', component: Login},
  {path: 'sign-up', component: Register},
  {path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
];
