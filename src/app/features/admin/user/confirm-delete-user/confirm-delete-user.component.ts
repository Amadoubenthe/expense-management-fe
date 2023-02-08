import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { User } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user/user.service';
// import { User } from 'src/app/core/models/user';
// import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-confirm-delete-user',
  templateUrl: './confirm-delete-user.component.html',
  styleUrls: ['./confirm-delete-user.component.scss'],
})
export class ConfirmDeleteUserComponent {
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteUserComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private _snackBar: MatSnackBar
  ) {}

  confirmeDialog() {
    const id = this.data.id;
    this.deleteUser(id);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((response) => {
      this.openSnackBar('Utilisateur supprimer avec succes');
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
