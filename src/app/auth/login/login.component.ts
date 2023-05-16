import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { updateLoading } from 'src/app/shared/shared.actions';

import { AuthService } from 'src/app/services/auth.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  sharedInfoSubscription!: Subscription;

  isLoading: boolean = false;

  constructor(private authService: AuthService, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('sample@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('Sample Password', Validators.required),
    });

    this.sharedInfoSubscription = this.store.select('sharedInfo').subscribe(({ isLoading }) => {
      this.isLoading = isLoading;
    });

  }

  ngOnDestroy(): void {
    this.sharedInfoSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(updateLoading({ loading: true }));

    const { email, password } = this.loginForm.value;
    this.authService
      .loginAccount(email, password)
      .then(
        () => {
          this.store.dispatch(updateLoading({ loading: false }));
          this.router.navigate(['/']);
        },
        (error) => {
          this.store.dispatch(updateLoading({ loading: false }));
          Swal.fire({ icon: 'error', title: 'Oops...', text: error.message })
        }
      );

  }

}
