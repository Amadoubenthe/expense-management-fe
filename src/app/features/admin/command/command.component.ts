import { CommandDeleteComponent } from './command-delete/command-delete.component';
import { CommandAddComponent } from './command-add/command-add.component';
import { CommandObject } from './../../../core/services/command/command.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Command, Payload, User } from 'src/app/core/models';
import { CommandService } from 'src/app/core/services/command/command.service';
import { StatusModalComponent } from './status-modal/status-modal.component';
import * as XLSX from 'xlsx';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
})
export class CommandComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'date',
    'product',
    'amount',
    'designation',
    'status',
    'actions',
  ];
  dataSource!: MatTableDataSource<Command>;

  commands!: Command[];
  filName = 'command.xlsx';
  userConnected!: Payload;
  currentUser!: User;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private commandService: CommandService,
    public dialog: MatDialog,
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('command');

    this.getUserConnected();

    this.getUserById();

    this.getAllCommands();

    console.log('commande2 ', this.currentUser?.roleId);
  }

  export() {
    console.log('Exporter');
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    XLSX.writeFile(wb, this.filName);
  }

  openDialog(data: Command): void {
    const dialogRef = this.dialog.open(StatusModalComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.getAllCommands();
    });
  }

  getAllCommands() {
    this.commandService.getAllCommands().subscribe((resp: CommandObject) => {
      const data = resp['data'];
      if (this.currentUser.roleId === 1) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        const commands = data.filter((c) => {
          return c.userId === this.currentUser.id;
        });
        this.dataSource = new MatTableDataSource(commands);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  getUserConnected(): void {
    this.userConnected = this.tokenService.getPayload();
  }

  getUserById() {
    this.userService.getUser(this.userConnected.id).subscribe((res) => {
      this.currentUser = res['data'];
    });
  }

  isAdmin() {
    return this.currentUser.roleId == 1;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addOrEditCommand(data?: Command): void {
    const dialogRef = this.dialog.open(CommandAddComponent, {
      width: '500px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result:', result);

      this.getAllCommands();
    });
  }

  deleteCommand(user: Command): void {
    const dialogRef = this.dialog.open(CommandDeleteComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllCommands();
    });
  }
}
