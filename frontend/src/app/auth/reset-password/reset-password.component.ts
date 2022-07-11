import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorComponent } from 'src/app/products/dialog/error/error.component';
import { SuccessComponent } from 'src/app/products/dialog/success/success.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  reset_password_validation_messages = {
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
    confirmPassword: [
      { type: 'required', message: 'Confirm Password is required' },
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

  token: any;
  resetPasswordForm: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService:AuthService,
    private dialog:MatDialog,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.token = data['token'];
      console.log(this.token);
    });

    this.resetPasswordForm = this.fb.group({
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
      confirmPassword: [
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

  resetPassword(){
   this.authService.resetPassword(this.token,this.resetPasswordForm.value.password).subscribe({
    next: (res) => {
      if (res.error) {
        console.log('error');
        this.dialog.open(ErrorComponent, {
          data: { message: res.error },
        });
      } else {
        this.dialog.open(SuccessComponent, {
          data: { message: res.message },
        });
        this.router.navigate(['/auth/login']);
      }
    },
   })
  }
}
