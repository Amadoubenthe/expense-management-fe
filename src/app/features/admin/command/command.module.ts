import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandRoutingModule } from './command-routing.module';
import { CommandAddComponent } from './command-add/command-add.component';
import { CommandDeleteComponent } from './command-delete/command-delete.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommandAddComponent, CommandDeleteComponent],
  imports: [
    CommonModule,
    CommandRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CommandModule {}
