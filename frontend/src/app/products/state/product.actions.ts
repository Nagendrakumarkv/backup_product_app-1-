import { Action as Actions } from "@ngrx/store";


import { Update } from "@ngrx/entity";

import { Product } from "../models/product.model";

export enum ProductActionTypes {
  LOAD_PRODUCTS = "[Product] Load Products",
  LOAD_PRODUCTS_SUCCESS = "[Product] Load Products Success",
  LOAD_PRODUCTS_FAIL = "[Product] Load Products Fail",
  LOAD_PRODUCT = "[Product] Load Product",
  LOAD_PRODUCT_SUCCESS = "[Product] Load Product Success",
  LOAD_PRODUCT_FAIL = "[Product] Load Product Fail",
  CREATE_PRODUCT = "[Product] Create Product",
  CREATE_PRODUCT_SUCCESS = "[Product] Create Product Success",
  CREATE_PRODUCT_FAIL = "[Product] Create Product Fail",
  UPDATE_PRODUCT = "[Product] Update Product",
  UPDATE_PRODUCT_SUCCESS = "[Product] Update Product Success",
  UPDATE_PRODUCT_FAIL = "[Product] Update Product Fail",
  DELETE_PRODUCT = "[Product] Delete Product",
  DELETE_PRODUCT_SUCCESS = "Product] Delete Product Success",
  DELETE_PRODUCT_FAIL = "[Product] Delete Product Fail"
}

export class LoadProducts implements Actions {
  readonly type = ProductActionTypes.LOAD_PRODUCTS;
}

export class LoadProductsSuccess implements Actions {
  readonly type = ProductActionTypes.LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {}
}

export class LoadProductsFail implements Actions {
  readonly type = ProductActionTypes.LOAD_PRODUCTS_FAIL;

  constructor(public payload: string) {}
}
export class LoadProduct implements Actions {
  readonly type = ProductActionTypes.LOAD_PRODUCT;
  constructor(public payload: any) {}
}

export class LoadProductSuccess implements Actions {
  readonly type = ProductActionTypes.LOAD_PRODUCT_SUCCESS;

  constructor(public payload: Product) {}
}

export class LoadProductFail implements Actions {
  readonly type = ProductActionTypes.LOAD_PRODUCT_FAIL;

  constructor(public payload: string) {}
}
export class CreateProduct implements Actions {
  readonly type = ProductActionTypes.CREATE_PRODUCT;

  constructor(public payload: Product) {}
}

export class CreateProductSuccess implements Actions {
  readonly type = ProductActionTypes.CREATE_PRODUCT_SUCCESS;

  constructor(public payload: Product) {}
}

export class CreateProductFail implements Actions {
  readonly type = ProductActionTypes.CREATE_PRODUCT_FAIL;

  constructor(public payload: string) {}
}

export class UpdateProduct implements Actions {
  readonly type = ProductActionTypes.UPDATE_PRODUCT;

  constructor(public payload: Product,public id:any) {}
}

export class UpdateProductSuccess implements Actions {
  readonly type = ProductActionTypes.UPDATE_PRODUCT_SUCCESS;

  constructor(public payload: Update<Product>) {}
}

export class UpdateProductFail implements Actions {
  readonly type = ProductActionTypes.UPDATE_PRODUCT_FAIL;

  constructor(public payload: string) {}
}

export class DeleteProduct implements Actions {
  readonly type = ProductActionTypes.DELETE_PRODUCT;

  constructor(public payload: number) {}
}

export class DeleteProductSuccess implements Actions {
  readonly type = ProductActionTypes.DELETE_PRODUCT_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteProductFail implements Actions {
  readonly type = ProductActionTypes.DELETE_PRODUCT_FAIL;

  constructor(public payload: string) {}
}

export type Action =
  | LoadProducts
  | LoadProductsSuccess
  | LoadProductsFail
  | LoadProduct
  | LoadProductSuccess
  | LoadProductFail
  | CreateProduct
  | CreateProductSuccess
  | CreateProductFail
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductFail
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductFail;
