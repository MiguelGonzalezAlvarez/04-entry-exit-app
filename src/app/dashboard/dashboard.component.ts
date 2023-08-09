import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription, filter } from 'rxjs';
import { EntryExitService } from '../services/entry-exit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription = new Subscription();

  constructor(private reduxStore: Store<AppState>, private entryExitService: EntryExitService) { }

  ngOnInit(): void {
    this.userSubscription = this.reduxStore
      .select('authInfo')
      .pipe(filter(authInfo => authInfo?.user != null))
      .subscribe(({ user }) => this.entryExitService.initEntryExitListener(user!.uid));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
