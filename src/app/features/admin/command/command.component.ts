import { CommandDeleteComponent } from './command-delete/command-delete.component';
import { CommandAddComponent } from './command-add/command-add.component';
import { CommandObject } from './../../../core/services/command/command.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Command } from 'src/app/core/models';
import { CommandService } from 'src/app/core/services/command/command.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
})
export class CommandComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'date',
    'site',
    'product',
    'amount',
    'designation',
    'operator',
    'status',
    'actions',
  ];
  dataSource!: MatTableDataSource<Command>;

  commands!: Command[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private commandService: CommandService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCommands();
  }

  getAllCommands() {
    this.commandService.getAllCommands().subscribe((resp: CommandObject) => {
      const data = resp['data'];
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
