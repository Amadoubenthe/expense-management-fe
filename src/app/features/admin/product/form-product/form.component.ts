import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Product, User } from 'src/app/core/models';
import {
  ProductObsect,
  ProductService,
} from 'src/app/core/services/product/product.service';
import {
  Role,
  RoleService,
} from 'src/app/core/services/role/role/role.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  editMode = false;
  roles!: Role[];

  userConnected!: any;

  form!: FormGroup;
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private ProductService: ProductService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private roleService: RoleService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getUserConnected();
    this.getRoless();
    this.editMode = !!this.data;
    this.initForm();
  }

  getUserConnected(): void {
    this.userConnected = this.tokenService.getPayload();
  }

  getRoless() {
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles['data'];
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      price: [this.data?.price, Validators.required],
      categoryId: [this.data?.categoryId, Validators.required],
      description: [this.data?.description],
    });
  }

  onSubmit() {
    if (!this.editMode) {
      const data: any = {
        ...this.form.value,
        userId: this.userConnected.id,
        categoryId: 1,
        status: 'Pending',
      };

      this.ProductService.addProduct(data).subscribe((res: ProductObsect) => {
        const message = res['message'];
        console.log('response: ', res);
        this.openSnackBar(message);
        this.onNoClick();
      });
    } else {
      const userData: User = {
        ...this.form.value,
      };

      // this.usersService
      //   .updateUser(parseInt(this.data.id), userData)
      //   .subscribe((user) => {
      //     this.openSnackBar('Utilisateur Modifier avec succes');
      //     this.onNoClick();
      //   });
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
