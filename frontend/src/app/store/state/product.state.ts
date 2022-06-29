import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  UpdateState,
} from '@ngxs/store';
import { tap } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/product.service';
import {
  AddProduct,
  DeleteProduct,
  GetProduct,
  UpdateProduct,
} from '../actions/product.action';

//state model
export class ProductStateModel {
  products!: Product[];
  productsLoaded!: boolean;
}

//state
@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
    productsLoaded: false,
  },
})
@Injectable()
export class ProductState {
  constructor(private service: ProductService) {}

  //Selecteor has logic to get the state data

  //Get product list from state
  @Selector()
  static getProductList(state: ProductStateModel) {
    return state.products;
  }
  @Selector()
  static getProductsLoaded(state: ProductStateModel) {
    return state.productsLoaded;
  }

  @Action(GetProduct)
  getProducts({ getState, setState }: StateContext<ProductStateModel>) {
    return this.service.getAllProducts().pipe(
      tap((res) => {
        const state = getState();
        setState({
          ...state,
          products: res,
          productsLoaded: true,
        });
      })
    );
  }

  @Action(AddProduct)
  addProducts(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    return this.service.addProducts(payload).pipe(
      tap((res) => {
        const state = getState();
        patchState({
          products: [...state.products, res],
        });
      })
    );
  }

  @Action(DeleteProduct)
  deleteProduct(
    { getState, setState }: StateContext<ProductStateModel>,
    { id }: DeleteProduct
  ) {
    return this.service.deleteProduct(id).pipe(
      tap((res) => {
        const state = getState();
        const fileredProducts = state.products.filter((res) => res.id !== id);
        setState({
          ...state,
          products: fileredProducts,
        });
      })
    );
  }

  @Action(UpdateProduct)
  updateProduct(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload, id }: UpdateProduct
  ) {
    return this.service.putProduct(payload, id).pipe(
      tap((res) => {
        const state = getState();
        const productList = state.products;
        console.log(productList);
        const index = productList.findIndex((res) => res.id == id);
        productList[index] = res;

        patchState({
          products: productList,
        });
      })
    );
  }
}
