import { Auth } from '../models/auth';

export class AuthConnexion {
  static readonly type = '[Auth] Connexion';

  constructor(public payload: Auth) {}
}

export class AuthDeconnexion {
  static readonly type = '[Auth] Deconnexion';
}