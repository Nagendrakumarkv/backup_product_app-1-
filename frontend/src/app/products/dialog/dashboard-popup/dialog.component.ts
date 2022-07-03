import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Product } from '../../models/product.model';
import { SuccessComponent } from '../success/success.component';

import { Store } from '@ngrx/store';
import * as productActions from '../../state/product.actions';
import * as fromProduct from '../../state/product.reducer';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['fresh', 'second hand', 'third hand'];
  productForm!: UntypedFormGroup;
  actionBtn: string = 'Save';

  constructor(
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private dialog: MatDialog,
    private store: Store<fromProduct.AppState>
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Upadte';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        const newProduct: Product = {
          productName: this.productForm.get('productName')?.value,
          category: this.productForm.get('category')?.value,
          date: this.productForm.get('date')?.value,
          freshness: this.productForm.get('freshness')?.value,
          price: this.productForm.get('price')?.value,
          comment: this.productForm.get('comment')?.value,
        };

        this.store.dispatch(new productActions.CreateProduct(newProduct));
        this.productForm.reset();
        this.dialogRef.close('save');
        let productAddedSuccessfull = 'Product Added Successfully';
        this.dialog.open(SuccessComponent, {
          data: { message: productAddedSuccessfull },
        });
      }
    } else {
      this.updateProduct();
    }
  }
  updateProduct() {
    const updateProduct: Product = {
      productName: this.productForm.get('productName')?.value,
      category: this.productForm.get('category')?.value,
      date: this.productForm.get('date')?.value,
      freshness: this.productForm.get('freshness')?.value,
      price: this.productForm.get('price')?.value,
      comment: this.productForm.get('comment')?.value,
    };
    this.store.dispatch(
      new productActions.UpdateProduct(updateProduct, this.editData._id)
    );

    this.productForm.reset();
    this.dialogRef.close('update');
    let productUpdatedSuccessfull = 'Product Updated Successfully';
    this.dialog.open(SuccessComponent, {
      data: { message: productUpdatedSuccessfull },
    });
  }
}
