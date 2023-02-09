import { CommandService } from './../../../../core/services/command/command.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Command, Payload, Product, Role } from 'src/app/core/models';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/core/services/role/role/role.service';
import {
  ProductObsect,
  ProductService,
} from 'src/app/core/services/product/product.service';
import {
  Site,
  SiteObject,
  SiteService,
} from 'src/app/core/services/site/site.service';
import {
  Category,
  CategoryObject,
  CategoryService,
} from 'src/app/core/services/category/category.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-command-add',
  templateUrl: './command-add.component.html',
  styleUrls: ['./command-add.component.scss'],
})
export class CommandAddComponent implements OnInit {
  editMode = false;
  roles!: Role[];
  products!: Product[];
  sites!: Site[];
  categories!: Category[];
  userConnected!: Payload;

  form!: FormGroup;
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private CommandService: CommandService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CommandAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private roleService: RoleService,
    private productService: ProductService,
    private siteService: SiteService,
    private categoryService: CategoryService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getUserConnected();
    this.getProducts();
    this.getRoless();
    this.getCategories();
    this.getSites();
    this.editMode = !!this.data;
    this.initForm();
  }

  getUserConnected(): void {
    this.userConnected = this.tokenService.getPayload();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res: CategoryObject) => {
      this.categories = res['data'];
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((res: ProductObsect) => {
      this.products = res['data'];
    });
  }
  getSites() {
    this.siteService.getSites().subscribe((res: SiteObject) => {
      this.sites = res['data'];
    });
  }

  getRoless() {
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles['data'];
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      designation: [this.data?.designation, Validators.required],
      quantity: [this.data?.quantity, Validators.required],
      reduction: [this.data?.reduction],
      siteId: [this.data?.siteId, Validators.required],
      productId: [this.data?.productId, Validators.required],
      categoryId: [this.data?.categoryId, Validators.required],
    });
  }

  onSubmit() {
    console.log('Mon ventre', this.form.value);
    const idProduct = parseInt(this.form.value.productId);

    const product = this.products.filter((product) => product.id === idProduct);
    const price =
      product[0].price * this.form.value.quantity - this.form.value.reduction;

    if (!this.editMode) {
      const command: Command = {
        ...this.form.value,
        createdAt: new Date(),
        status: 'pending',
        userId: this.userConnected.id,
        amount: price,
      };

      this.CommandService.addCommand(command).subscribe((res) => {
        this.openSnackBar('Command creer avec succes');
        this.onNoClick();
      });
    } else {
      const commandUpdated: Command = {
        ...this.form.value,
      };

      this.CommandService.updateCommand(
        parseInt(this.data.id),
        commandUpdated
      ).subscribe((user) => {
        this.openSnackBar('Command Modifier avec succes');
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
