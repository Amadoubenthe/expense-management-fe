import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models';
// import { UserService } from 'src/app/core/services/user/user.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { ConfirmDeleteUserComponent } from './confirm-delete-user/confirm-delete-user.component';
import { UserService } from 'src/app/core/services/user/user.service';
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

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'role',
    'phone',
    'date',
    'actions',
  ];
  dataSource!: MatTableDataSource<User>;

  users!: User[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  animal!: string;
  name!: string;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers();
    // this.userService.getUsers().subscribe((users) => {
    //   console.log(users['data'][2].Role?.name);
    //   const data = users['data'];
    //   this.dataSource = new MatTableDataSource(data);
    // });
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: any) => {
      const userData = users;
      const data = users['data'];
      this.dataSource = new MatTableDataSource(data);
      // this.dataSource = new MatTableDataSource(userData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addOrEditUser(data?: User): void {
    console.log('data de butt', data);

    const dialogRef = this.dialog.open(FormComponent, {
      width: '500px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result:', result);

      this.getUsers();
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDeleteUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }
}
