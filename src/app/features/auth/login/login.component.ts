import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      email: ['amadouAdmin@test.com', Validators.required],
      password: ['password', Validators.required],
    });
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

  getFormControlErrorText(abstractControl: AbstractControl): string {
    if (abstractControl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (abstractControl.hasError('email')) {
      return "Merci d'entrer une adresse mail valide";
    } else if (abstractControl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (abstractControl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else {
      return 'Ce champ contient une erreur';
    }
  }
}
