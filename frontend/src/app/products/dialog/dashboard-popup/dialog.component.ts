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
import { ProductService } from '../../product.service';
import { ErrorComponent } from '../error/error.component';
import { SuccessComponent } from '../success/success.component';

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
    private productService: ProductService
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
      this.productForm.controls['productName'].setValue(this.editData.productName);
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
        this.productService.addProducts(this.productForm.value).subscribe({
          next: (res) => {
            this.productForm.reset();
            this.dialogRef.close('save');
            let productAddedSuccessfull = 'Product Added Successfully';
            this.dialog.open(SuccessComponent, {
              data: { message: productAddedSuccessfull },
            });
          },
          error: () => {
            let productAddedUnsuccessfull = 'Product Added Unsuccessfull';
            this.dialog.open(ErrorComponent, {
              data: { message: productAddedUnsuccessfull },
            });
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }
  updateProduct() {
    this.productService
      .putProduct(this.productForm.value, this.editData._id)
      .subscribe({
        next: (res) => {
          this.productForm.reset();
          this.dialogRef.close('update');
          let productUpdatedSuccessfull = 'Product Updated Successfully';
          this.dialog.open(SuccessComponent, {
            data: { message: productUpdatedSuccessfull },
          });
        },
        error: () => {
          let productUpdatedUnsuccessfull = 'Product updated Unsuccessfull';
            this.dialog.open(ErrorComponent, {
              data: { message: productUpdatedUnsuccessfull },
            });
        },
      });
  }
}
