import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { EmailActivationComponent } from './email-activation/email-activation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, EmailActivationComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
