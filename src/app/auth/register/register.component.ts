import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { updateLoading } from 'src/app/shared/shared.actions';

import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  sharedInfoSubscription!: Subscription;

  isLoading: boolean = false;

  constructor(private authService: AuthService, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      user: new FormControl('Sample User', [Validators.required]),
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

  createAccount() {
    if (this.registerForm.invalid) return;

    this.store.dispatch(updateLoading({ loading: true }));

    const { user, email, password } = this.registerForm.value;
    this.authService
      .createAccount(user, email, password)
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
