import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorComponent } from 'src/app/products/dialog/error/error.component';
import { SuccessComponent } from 'src/app/products/dialog/success/success.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgot_password_validation_messages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' },
    ],
  };

  forgotPasswordForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
    });
  }

  forgotPassword() {
    this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
        next: (res) => {
          if (res.error) {
            console.log('error');
            this.dialog.open(ErrorComponent, {
              data: { message: res.error },
            });
          } else {
            let activateEmailSuccess = res.message;
            this.dialog.open(SuccessComponent, {
              data: { message: activateEmailSuccess },
            });
            this.router.navigate(['/auth/login']);
          }
        },
      });
  }
}
