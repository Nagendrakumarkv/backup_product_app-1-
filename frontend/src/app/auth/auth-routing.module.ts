import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailActivationComponent } from './email-activation/email-activation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'activation/activate/:token',component:EmailActivationComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password/:token',component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
