import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegistationComponent } from './auth/components/registration/registration';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { AuthGuard } from '../guard/auth.guard';

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
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: LoginComponent
    }
];

