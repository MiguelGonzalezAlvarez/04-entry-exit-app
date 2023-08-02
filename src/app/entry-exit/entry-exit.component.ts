import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { resetLoading, updateLoading } from '../shared/shared.actions';

import Swal from 'sweetalert2';

import { EntryExitService } from '../services/entry-exit.service';


@Component({
  selector: 'app-entry-exit',
  templateUrl: './entry-exit.component.html',
  styleUrls: ['./entry-exit.component.css']
})
export class EntryExitComponent implements OnInit, OnDestroy {
  entryExitForm: FormGroup = new FormGroup({});
  loadingSubscription: Subscription = new Subscription();

  entryExitType = 'entry';
  loading = false;

  constructor(private fb: FormBuilder, private EntryExitService: EntryExitService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.entryExitForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.loadingSubscription = this.store.select('sharedInfo').subscribe(({ isLoading }) => {
      this.loading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  saveEntryExit(): void {
    if (this.entryExitForm.invalid) return;

    this.store.dispatch(updateLoading({ loading: true }));

    const { description, amount } = this.entryExitForm.value;
    const entryExit = { description, amount, type: this.entryExitType };

    this.EntryExitService.createEntryExit(entryExit)
      .then(
        () => {
          Swal.fire('Register added', description, 'success');
          this.entryExitForm.reset();
          this.store.dispatch(resetLoading());
        },
        (error) => {
          Swal.fire('Error', error.message, 'error');
          this.store.dispatch(resetLoading());
        }
      );
  }

}
