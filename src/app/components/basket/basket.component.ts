import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Observable } from 'rxjs';
import { BasketProduct } from 'src/app/class/basket-product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  productBasketList$: Observable<BasketProduct[]>;
  productBasketListIsEmpty: boolean;
  valueProductBasketList: number



  constructor(private clientService: ClientService) {
    this.productBasketList$ = this.clientService.getProductBasket();

    this.productBasketList$.subscribe(data => {
      this.checkProductListIsEmpty(data);
      this.calculateValueOfBasketList(data);
    }
    );
  }

  ngOnInit() {
  }

  private checkProductListIsEmpty(data) {
    this.productBasketListIsEmpty = data.length > 0 ? false : true
  }
  private calculateValueOfBasketList(data: BasketProduct[]){
    this.valueProductBasketList = 0;
    data.forEach(product => {
      this.valueProductBasketList+= product.getPrice()*product.getNumberProduct();
    });
  }
  public buyBasket(){
    this.clientService.buyBasket();
  }
  public removeProduct(product: BasketProduct){
    this.clientService.removeProductBasket(product);
  }

}
