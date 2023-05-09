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
      user: new FormControl('Sample User', [Validators.required]),
      email: new FormControl('sample@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('Sample Password', Validators.required),
    });
  }

  createAccount() {
    console.log(this.registerForm.value);
  }

}
