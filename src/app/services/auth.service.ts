import { Injectable } from '@angular/core';
import { User, Auth, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { updateUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentAuthState: User | null;

  constructor(private fireStore: Firestore, private fireAuth: Auth, private store: Store<AppState>) {
    this.currentAuthState = null;
  }

  async createAccount(name: string, email: string, password: string): Promise<UserCredential | void> {
    const { user } = await createUserWithEmailAndPassword(this.fireAuth, email, password);
    return await this.updateAccount(user.uid, name, email);
  }

  updateAccount(userId: string, userName: string, userEmail: string): Promise<void> {
    return setDoc(doc(this.fireStore, `users/${userId}`), { userId, userName, userEmail }, { merge: true });
  }

  loginAccount(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.fireAuth, email, password);
  }

  logoutAccount(): Promise<void> {
    return signOut(this.fireAuth);
  }

  initAuthStateListener(): void {
    onAuthStateChanged(this.fireAuth, (authState) => {
      this.currentAuthState = authState;
      this.store.dispatch(updateUser({ currentUser: authState! }));
    });
  }

  isUserAuthorized(): boolean {
    return this.currentAuthState !== null;
  }

  getCurrentUserId(): string {
    return this.currentAuthState?.uid ?? '';
  }

}
