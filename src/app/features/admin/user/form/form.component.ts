import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Role, User } from 'src/app/core/models';
import { RoleService } from 'src/app/core/services/role/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  editMode = false;
  roles!: Role[];

  form!: FormGroup;
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private usersService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.getRoless();
    this.editMode = !!this.data;
    this.initForm();
  }

  getRoless() {
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles['data'];
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      firstName: [this.data?.firstName, Validators.required],
      lastName: [this.data?.lastName, Validators.required],
      email: [this.data?.email, Validators.required],
      phone: [this.data?.phone, Validators.required],
      roleId: [this.data?.role, Validators.required],
    });
  }

  onSubmit() {
    if (!this.editMode) {
      const password = this.form.value.firstName + '1234';

      const userData: User = {
        ...this.form.value,
        password,
      };

      this.usersService.addUser(userData).subscribe((user) => {
        console.log('response: ', user);

        this.openSnackBar('Utilisateur creer avec succes');
        this.onNoClick();
      });
    } else {
      const userData: User = {
        ...this.form.value,
      };

      this.usersService
        .updateUser(parseInt(this.data.id), userData)
        .subscribe((user) => {
          this.openSnackBar('Utilisateur Modifier avec succes');
          this.onNoClick();
        });
    }

    this.form.reset();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
