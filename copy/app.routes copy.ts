import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { authGuard, authGuardAlreadyAuth } from './guards/auth.guard';
import { MainComponent } from './pages/protected-route/protected-route.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    // runGuardsAndResolvers: 'always',
  },
  {
    path: 'login',
    component: SigninComponent,
    canActivate: [authGuardAlreadyAuth],
  },
];

// export const routes: Routes = [
//   {
//     path: '',
//     component: MainComponent,
//     canActivate: [authGuard],
//     children: [
//       {
//         path: '',
//         component: DashboardComponent,
//       },

//       {
//         path: 'profile',
//         component: ProfileComponent,
//         // runGuardsAndResolvers: 'always',
//       },
//     ],
//   },
//   {
//     path: 'login',
//     component: SigninComponent,
//     canActivate: [authGuardAlreadyAuth],
//   },
// ];
