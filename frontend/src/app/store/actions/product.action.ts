import { Product } from "src/app/products/models/product.model";

export class AddProduct {
  static readonly type = '[Product] Add';
  constructor(public payload: Product) {}
}

export class GetProduct {
  static readonly type = '[Product] Get';
  constructor() {}
}

export class DeleteProduct {
  static readonly type = '[Product] Delete';
  constructor(public id: string) {}
}

export class UpdateProduct {
  static readonly type = '[Product] Update';
  constructor(public payload: Product, public id: string) {}
}
