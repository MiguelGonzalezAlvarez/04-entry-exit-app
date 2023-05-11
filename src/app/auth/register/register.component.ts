import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      user: new FormControl('Sample User', [Validators.required]),
      email: new FormControl('sample@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('Sample Password', Validators.required),
    });
  }

  createAccount() {
    if (this.registerForm.invalid) return;

    const { user, email, password } = this.registerForm.value;
    
    this.authService
      .createAccount(user, email, password)
      .then(
        () => this.router.navigate(['/']),
        (error) => Swal.fire({ icon: 'error', title: 'Oops...', text: error.message })
      );
  }

}
