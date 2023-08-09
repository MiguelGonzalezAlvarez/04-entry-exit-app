import { Injectable } from '@angular/core';
import { Firestore, deleteDoc, doc, setDoc } from '@angular/fire/firestore';

import { EntryExit } from '../models/entry-exit.model';
import { AuthService } from './auth.service';
import { onSnapshot } from 'firebase/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { updateItems } from '../entry-exit/entry-exit.actions';

@Injectable({
    providedIn: 'root'
})
export class EntryExitService {

    constructor(private reduxStore: Store<AppState>, private fireStore: Firestore, private authService: AuthService) { }

    initEntryExitListener(uid: string): void {
        onSnapshot(doc(this.fireStore, `${uid}/entry-exit`), (doc) => this.reduxStore.dispatch(updateItems(doc.data()?.['items'] ?? [])));
    }

    createEntryExit(entryExit: EntryExit): Promise<void> {
        const userId = this.authService.getCurrentUserId();
        return setDoc(doc(this.fireStore, `entry-exit/${userId}`), entryExit, { merge: true });
    }

    deleteEntryExit(entryExitId: string): Promise<void> {
        const uid = this.authService.getCurrentUserId();
        return deleteDoc(doc(this.fireStore, `${uid}/entry-exit/items/${entryExitId}`));
    }

}