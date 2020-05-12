import { Component, OnInit, Inject } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/class/product';
import { ApiService } from 'src/app/services/api.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-dialog-detail-product',
  templateUrl: './dialog-detail-product.component.html',
  styleUrls: ['./dialog-detail-product.component.scss']
})
export class DialogDetailProductComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDetailProductComponent>,
    private apiService: ApiService,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public product: Product)
    {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addBasket(){
    this.clientService.addProductBasket(this.product);
    this.apiService.productBuy(this.product);
    this.dialogRef.close();
  }
  checkCanBuy(product: Product){
    return product.getStock() > 0 ? true : false;
  }
  ngOnInit() {
  }

}
