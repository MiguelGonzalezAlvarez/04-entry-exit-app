import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

import { EntryExit } from '../models/entry-exit.model';
import { AuthService } from './auth.service';
import { onSnapshot } from 'firebase/firestore';

@Injectable({
    providedIn: 'root'
})
export class EntryExitService {

    constructor(private fireStore: Firestore, private authService: AuthService) { }

    initEntryExitListener(uid: string): void {
        onSnapshot(doc(this.fireStore, `${uid}/entry-exit`), (doc) => {
            console.log(doc.data());
        });
    }

    createEntryExit(entryExit: EntryExit): Promise<void> {
        const userId = this.authService.getCurrentUserId();
        return setDoc(doc(this.fireStore, `entry-exit/${userId}`), entryExit, { merge: true });
    }

}