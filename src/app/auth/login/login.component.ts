import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('sample@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('Sample Password', Validators.required),
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    Swal.fire({ title: "Loading...", didOpen: () => Swal.showLoading() });

    this.authService
      .loginAccount(email, password)
      .then(
        () => {
          this.router.navigate(['/']);
          Swal.close();
        },
        (error) => Swal.fire({ icon: 'error', title: 'Oops...', text: error.message })
      );
  }

}
