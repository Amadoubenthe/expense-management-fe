import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product, User } from 'src/app/core/models';
// import { UserService } from 'src/app/core/services/user/user.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
// import { FormComponent } from '../form/form.component';
// import { ConfirmDeleteUserComponent } from './confirm-delete-user/confirm-delete-user.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { ConfirmDeleteUserComponent } from '../user/confirm-delete-user/confirm-delete-user.component';
import {
  ProductObsect,
  ProductService,
} from 'src/app/core/services/product/product.service';
import { FormComponent } from './form-product/form.component';
import { TokenService } from 'src/app/core/services/token/token.service';
import { ConfirmDeleteProductComponent } from './confirm-delete-product/confirm-delete-product.component';
// import { UserService } from 'src/app/core/services/users/users.service';

export interface DialogData {
  animal: string;
  name: string;
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'price',
    'status',
    'date',
    'actions',
  ];
  dataSource!: MatTableDataSource<Product>;

  products!: Product[];

  userConnected!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res: ProductObsect) => {
      const data = res['data'];

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addOrEditProduct(data?: User): void {
    console.log('data de butt', data);

    const dialogRef = this.dialog.open(FormComponent, {
      width: '500px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result:', result);

      this.getProducts();
    });
  }

  deleteProduct(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDeleteProductComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }
}
