import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormComponent } from './form-product/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteProductComponent } from './confirm-delete-product/confirm-delete-product.component';

@NgModule({
  declarations: [ProductComponent, FormComponent, ConfirmDeleteProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductModule {}
