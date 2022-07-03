import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorComponent } from './products/dialog/error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { SuccessComponent } from './products/dialog/success/success.component';

//Angular material modules
import { AngularMaterialModule } from './modules/angular-material.module';

//NGRX
import { StoreModule } from '@ngrx/store';

import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterStateSerializer
} from "@ngrx/router-store";

import { CustomSerializer } from "./shared/utils";
import { CommonModule } from '@angular/common';



import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ProductsModule } from './products/products.module';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        ErrorComponent,
        SuccessComponent,
    ],
    imports: [
        // BrowserModule,
        // AppRoutingModule,
        // BrowserAnimationsModule,
        // ReactiveFormsModule,
        // FormsModule,
        // HttpClientModule,
        // AngularMaterialModule,

        // //NGRX
        // StoreModule.forRoot({}),

        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        StoreModule.forRoot({
          router: routerReducer
        }),
        StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([]),
        HttpClientModule,
        AppRoutingModule,
        AngularMaterialModule,
        ProductsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        { provide: RouterStateSerializer, useClass: CustomSerializer}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
