import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';

import { AuthState } from '../shared/states/auth-state';
import { FavorisState } from '../shared/states/favoris-state';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(
      [AuthState, FavorisState],
      { developmentMode: true },
      withNgxsStoragePlugin({
        keys: ['favoris', 'auth'] // Persister les deux
      })
    )
  ]
};