import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

import { EntryExit } from '../models/entry-exit.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class EntryExitService {

    constructor(private fireStore: Firestore, private authService:AuthService) {}

    createEntryExit(entryExit: EntryExit): Promise<void> {
        const userId = this.authService.getCurrentUserId();
        return setDoc(doc(this.fireStore, `entry-exit/${userId}`), entryExit, { merge: true });
    }

}
