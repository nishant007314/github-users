import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hover: boolean;
  invalidLogin: boolean;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.hover = false;
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      remember: new FormControl(false)
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  login() {
    const credentials = this.loginForm.value;
    this.authService.login(credentials)
      .subscribe(
        result => {
          if (result) {
            const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            const username = credentials.username;
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
            } else {
              this.router.navigate(['/profile', username]);
            }
          } else {
            this.invalidLogin = true;
          }
        }
      );
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
