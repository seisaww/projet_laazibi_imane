import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthConnexion } from '../../../shared/actions/auth-action';
import { AuthState } from '../../../shared/states/auth-state';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {  
  
  connexion: Signal<boolean>;
  private store = inject(Store);

  constructor() {
    this.connexion = toSignal(
      this.store.select(AuthState.isConnected),
      { initialValue: false }
    );
  }

  login() {
    this.store.dispatch(new AuthConnexion({ connexion: true }));
  }

  logout() {
    this.store.dispatch(new AuthConnexion({ connexion: false }));
  }
}