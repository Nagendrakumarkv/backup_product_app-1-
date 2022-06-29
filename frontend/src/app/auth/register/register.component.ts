import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessComponent } from '../../products/dialog/success/success.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  register_validation_messages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minlength',
        message: 'Password must be at least 8 characters long',
      },
      {
        type: 'pattern',
        message:
          'password must contain at least one uppercase, lowercase, number and special char',
      },
    ],
  };

  genderList = ['Male', 'Female', 'both'];
  registerForm!: UntypedFormGroup;
  registerdUsers: any;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(8),
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
          ), //this is for the letters (both uppercase and lowercase) and numbers validation
        ]),
      ],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.valid) {
      this.authService
        .createUser(
          this.registerForm.value.email,
          this.registerForm.value.password
        )
        .subscribe({
          next: (res: any) => {
            console.log(res);
            let successFullRegister = 'successfully registered';
            this.dialog.open(SuccessComponent, {
              data: { message: successFullRegister },
            });
            this.registerForm.reset();
            this.router.navigate(['/auth/login']);
          },
        });
    }
  }
}
