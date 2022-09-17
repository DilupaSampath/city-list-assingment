import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './core/error-pages/not-found-page/not-found-page.component';
import { NotUnauthorizePageComponent } from './core/error-pages/not-unauthorize-page/not-unauthorize-page.component';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'auth-user',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'cities',
    loadChildren: () => import('./modules/cities/cities.module').then(m => m.CityModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),

    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_ALLOW_EDIT',
      ]
    }

  },
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
    }

  },
  {
    path: 'not-found',
    component: NotFoundPageComponent,
    children: [
      { path: '', component: NotFoundPageComponent },
    ]
  },
  {
    path: 'not-authorize',
    component: NotUnauthorizePageComponent,
    children: [
      { path: '', component: NotFoundPageComponent },
    ]
  }
  ,
  {
    path: '',
    redirectTo: '/auth-user/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
