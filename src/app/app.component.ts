import { Component, inject } from '@angular/core';
import { Item } from '@angular/fire/analytics';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'entryExitApp';

  constructor(private authService: AuthService) {
    this.authService.initAuthStateListener();
  }

}
