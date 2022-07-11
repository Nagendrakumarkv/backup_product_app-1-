import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorComponent } from 'src/app/products/dialog/error/error.component';
import { SuccessComponent } from 'src/app/products/dialog/success/success.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrls: ['./email-activation.component.scss'],
})
export class EmailActivationComponent implements OnInit {
  token: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    //getting token from url
    this.activatedRoute.params.subscribe((data) => {
      this.token = data['token'];
    });
  }

  //account activation logic , if success go to login page with success message , if false getting error message
  activateEmail() {
    console.log(this.token);
    this.service.postActivateEmail(this.token).subscribe({
      next: (res) => {
        if (res.error) {
          console.log('error');
          let productGetUnsuccessfull =res.error;
          this.dialog.open(ErrorComponent, {
            data: { message: productGetUnsuccessfull },
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

  //cancel the account activation and go to register page
  cancelActivate() {
    if (confirm('Are you sure to cancel the activation of your account')) {
      this.router.navigate(['/auth/register']);
    }
  }
}
