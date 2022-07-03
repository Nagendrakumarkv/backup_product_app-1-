import { Injectable } from '@angular/core';

import { Actions, ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';
import * as productActions from '../state/product.actions';
import { Product } from '../models/product.model';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<productActions.LoadProducts>(
        productActions.ProductActionTypes.LOAD_PRODUCTS
      ),
      mergeMap((action: productActions.LoadProducts) =>
        this.productService.getAllProducts().pipe(
          map(
            (products: Product[]) =>
              new productActions.LoadProductsSuccess(products)
          ),
          catchError((err) => of(new productActions.LoadProductsFail(err)))
        )
      )
    );
  });

  loadProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<productActions.LoadProduct>(
        productActions.ProductActionTypes.LOAD_PRODUCT
      ),
      mergeMap((action: productActions.LoadProduct) =>
        this.productService.getProductById(action.payload).pipe(
          map(
            (product: Product) => new productActions.LoadProductSuccess(product)
          ),
          catchError((err) => of(new productActions.LoadProductFail(err)))
        )
      )
    );
  });

  createProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<productActions.CreateProduct>(
        productActions.ProductActionTypes.CREATE_PRODUCT
      ),
      map((action: productActions.CreateProduct) => action.payload),
      mergeMap((product: Product) =>
        this.productService.addProducts(product).pipe(
          map(
            (newProduct: Product) =>
              new productActions.CreateProductSuccess(newProduct)
          ),
          catchError((err) => of(new productActions.CreateProductFail(err)))
        )
      )
    );
  });

  updateId = '';
  getUpdateId = this.actions$.subscribe((action: any) => {
    this.updateId = action.id;
  });

  updateProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<productActions.UpdateProduct>(
        productActions.ProductActionTypes.UPDATE_PRODUCT
      ),
      map((action: productActions.UpdateProduct) => action.payload),
      mergeMap((product: Product) =>
        this.productService.putProduct(product, this.updateId).pipe(
          map(
            (updateProduct: Product) =>
              new productActions.UpdateProductSuccess({
                id: updateProduct.id,
                changes: updateProduct,
              })
          ),
          catchError((err) => of(new productActions.UpdateProductFail(err)))
        )
      )
    );
  });

  deleteProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<productActions.DeleteProduct>(
        productActions.ProductActionTypes.DELETE_PRODUCT
      ),
      map((action: productActions.DeleteProduct) => action.payload),
      mergeMap((id: number) =>
        this.productService.deleteProduct(id).pipe(
          map(() => new productActions.DeleteProductSuccess(id)),
          catchError((err) => of(new productActions.DeleteProductFail(err)))
        )
      )
    );
  });
}
