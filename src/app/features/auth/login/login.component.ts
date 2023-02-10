import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  private initFormGroup(): void {
    this.loginForm = this.fb.group({
      email: ['amadouAdmin@test.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        console.log(data.access_token);
        this.tokenService.saveToken(data.access_token);
      },
      (err) => console.log(err)
    );
  }
}
