import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: Auth) { }

  createAccount(user: string, email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.fireAuth, email, password);
  }

}
