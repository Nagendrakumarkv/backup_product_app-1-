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
;
import { CommonModule } from '@angular/common';

import { ProductsModule } from './products/products.module';

//NGXS
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ProductState } from './store/state/product.state';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        ErrorComponent,
        SuccessComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        AppRoutingModule,
        AngularMaterialModule,
        ProductsModule,
         //NGXS
    NgxsModule.forRoot([ProductState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
