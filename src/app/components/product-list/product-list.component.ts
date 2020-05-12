import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/class/product';
import { ClientService } from 'src/app/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailProductComponent } from '../dialog-detail-product/dialog-detail-product.component';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList$: Observable<Product[]>;

  constructor(private apiService: ApiService, private clientService: ClientService, private dialog: MatDialog) {
    this.subscribeToProductList();
  }

  public subscribeToProductList() {
    this.productList$ = this.apiService.getProductList();
    this.productList$.subscribe();
  }

  ngOnInit() {

  }
  // ajout du pro
  addBasket(newProduct: Product) {
    this.clientService.addProductBasket(newProduct);
    // remove on product on stock
    this.apiService.productBuy(newProduct);
  }

  checkCanBuy(product: Product) {
    return product.getStock() > 0 ? true : false;
  }

  openDialogDetailProduct(product: Product): void {
    const dialogRef = this.dialog.open(DialogDetailProductComponent, {
      width: '500px',
      data: product
    });
  }

}
