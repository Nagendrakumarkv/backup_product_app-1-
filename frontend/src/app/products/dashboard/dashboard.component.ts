import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dashboard-popup/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthService } from '../../auth/auth.service';
import { SuccessComponent } from '../dialog/success/success.component';

import { Store, State, select } from '@ngrx/store';
import * as productActions from '../state/product.actions';
import * as fromProduct from '../state/product.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'freshness',
    'price',
    'comment',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  registeredUsersInfo: any;
  userName!: string;
  userId!: string;
  userIsAuthenticated = false;

  productLoadedSub!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  products$: Observable<Product[]> | undefined;
  error$: Observable<String> | undefined;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private store: Store<fromProduct.AppState>
  ) {}

  ngOnInit(): void {
    this.getRegisteredUserInfo();

    this.userIsAuthenticated = this.authService.getUserIsAuthenticated();
    this.userId = this.authService.getUserId();

    this.getAllProducts();
  }

  login() {
    this.router.navigate(['/auth/login']);
  }
  logOut() {
    this.authService.logOutUser();
    this.router.navigate(['/auth/login']);
  }
  getAllProducts() {
    this.store.dispatch(new productActions.LoadProducts());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    console.log(this.products$);
    this.products$.subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
    this.error$ = this.store.pipe(select(fromProduct.getError));
  }
  getRegisteredUserInfo() {
    this.authService.geRegisteredtUserInfo().subscribe((data) => {
      this.registeredUsersInfo = data;
      for (let i = 0; i < this.registeredUsersInfo.length; i++) {
        if (this.userId == this.registeredUsersInfo[i]._id) {
          this.userName = this.registeredUsersInfo[i].email
            .split('@')
            .slice(0, 1);
        }
      }
    });
  }
  openDialog() {
    console.log('open dialog');
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == 'save') {
          this.getAllProducts();
        }
      });
  }

  editProduct(row: any) {
    this.store.dispatch(new productActions.LoadProduct(row._id));
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == 'update') {
          this.getAllProducts();
        }
      });
  }
  deleteProduct(id: any) {
    if (confirm('Are You Sure You want to Delete the Product?')) {
      this.store.dispatch(new productActions.DeleteProduct(id));
      let productDeletedSuccessfull = 'Product Deleted Successfully';
      this.dialog.open(SuccessComponent, {
        data: { message: productDeletedSuccessfull },
      });
      this.getAllProducts();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy(): void {
    this.userIsAuthenticated = false;
  }
}
