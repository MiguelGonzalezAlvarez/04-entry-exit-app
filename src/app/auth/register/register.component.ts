import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      user: new FormControl('user', [Validators.required]),
      email: new FormControl('email', [Validators.required, Validators.email]),
      password: new FormControl('password', Validators.required),
    });
  }

  createAccount() {
    console.log(this.registerForm.value);
  }

}
