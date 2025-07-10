import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login';
import { RegistationComponent } from './auth/components/registration/registration';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistationComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '**',
        component: LoginComponent
    }
];
