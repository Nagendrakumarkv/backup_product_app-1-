import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { EffectsModule, Actions } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";


import { DashboardComponent } from "./dashboard/dashboard.component";
import { DialogComponent } from "./dialog/dashboard-popup/dialog.component";
import { AngularMaterialModule } from "../modules/angular-material.module";


const productRoutes: Routes = [{ path: "", component: DashboardComponent }];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild(productRoutes),
  ],
  declarations: [
   DashboardComponent,
   DialogComponent
  ]
})
export class ProductsModule {}
