import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  ProductObsect,
  ProductService,
} from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-confirm-delete-product',
  templateUrl: './confirm-delete-product.component.html',
  styleUrls: ['./confirm-delete-product.component.scss'],
})
export class ConfirmDeleteProductComponent {
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteProductComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  confirmeDialog() {
    const id = this.data.id;
    this.deleteProduct(id);
  }

  deleteProduct(id: number) {
    this.productService
      .deleteProduct(id)
      .subscribe((response: ProductObsect) => {
        const message = response['message'];
        this.openSnackBar(message);
      });
    this.dialogRef.close();
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
