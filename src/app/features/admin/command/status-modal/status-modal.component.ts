import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CommandService } from 'src/app/core/services/command/command.service';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss'],
})
export class StatusModalComponent implements OnInit {
  form!: FormGroup;
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialogRef: MatDialogRef<StatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private commandService: CommandService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      status: [this.data?.status, Validators.required],
    });
  }

  foods: Status[] = [
    { value: 'pending', viewValue: 'En Attente' },
    { value: 'rejected', viewValue: 'Rejeter' },
    { value: 'validated', viewValue: 'Valider' },
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const command = {
      ...this.data,
      status: this.form.value.status,
    };

    this.commandService.updateCommand(this.data.id, command).subscribe(() => {
      this.openSnackBar('Command Modifier avec succes');
      this.onNoClick();
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
