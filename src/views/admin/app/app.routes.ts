import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ProtectedRouteComponent } from './pages/protected-route/protected-route.component';

export const routes: Routes = [
  {
    path: '',
    component: ProtectedRouteComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
];
