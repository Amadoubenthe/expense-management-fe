import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ToolbarComponent } from 'src/app/core/components/toolbar/toolbar.component';
import { CommandComponent } from './command/command.component';

@NgModule({
  declarations: [AdminComponent, ToolbarComponent, MainLayoutComponent, CommandComponent],
  imports: [CommonModule, AdminRoutingModule, MaterialModule],
})
export class AdminModule {}
