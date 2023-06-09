import { Routes } from '@angular/router';
import { HasNameGuard } from './shared/guards/has-name/has-name.guard';
import { HasValueGuard } from './shared/guards/has-value/has-value.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'value-input',
    loadComponent: () =>
      import('./pages/value-input/value-input.component').then(
        (m) => m.ValueInputComponent
      ),
    canActivate: [HasNameGuard],
  },
  {
    path: 'simulation',
    loadComponent: () =>
      import('./pages/simulation/simulation.component').then(
        (m) => m.SimulationComponent
      ),
    canActivate: [HasValueGuard],
    children: [
      {
        path: 'selector',
        loadComponent: () =>
          import(
            './pages/simulation/simulation-selector/simulation-selector.component'
          ).then((m) => m.SimulationSelectorComponent),
      },
      {
        path: 'list',
        loadComponent: () =>
          import(
            './pages/simulation/simulation-list/simulation-list.component'
          ).then((m) => m.SimulationListComponent),
      },
      {
        path: 'error',
        loadComponent: () =>
          import(
            './pages/simulation/simulation-error/simulation-error.component'
          ).then((m) => m.SimulationErrorComponent),
      },
      { path: '', pathMatch: 'full', redirectTo: 'selector' },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
