import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BasketProduct } from "../class/basket-product";
import { Product } from "../class/product";
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: "root",
})
export class ClientService {
  private clientBasket: BehaviorSubject<BasketProduct[]> = new BehaviorSubject<BasketProduct[]>([]);
  private numberProductBasket: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private snackBarService: SnackBarService) { }

  // add product in basket product
  public addProductBasket(newProduct: Product) {
    const newClientBasket = this.createNewClientBasketWithAdd(
      this.clientBasket.getValue(),
      newProduct
    );
    this.clientBasket.next(newClientBasket);
    this.numberProductBasket.next(this.calculateNumberProductBasket());
    this.snackBarService.openSnackBar("Un(e) " + newProduct.getName().toLowerCase() + " est ajouté(e) au panier !");
  }
  // create the new client basket when add a product
  private createNewClientBasketWithAdd(
    oldClientBasket: BasketProduct[],
    newProduct: Product): BasketProduct[] {
    let productFound = false;
    // find if product exist in basket product
    oldClientBasket.find((product) => {
      // if basket product exist the add prodct we just add a number of this product in basket
      if (this.sameProduct(product, newProduct)) {
        product.addOneProduct();
        productFound = true;
      }
    });
    // if basket product don't exist the add product we add a new product of this
    if (productFound === false) {
      oldClientBasket.push(
        new BasketProduct(
          newProduct
        )
      );
    }
    return oldClientBasket;
  }

  // check two product is equal
  private sameProduct(product: BasketProduct, newProduct: Product): boolean {
    return product.getId() === newProduct.getId()
  }

  public removeProductBasket(removeProduct: BasketProduct) {
    const newClientBasket = this.createNewClientBasketWithRemove(this.clientBasket.getValue(), removeProduct);
    this.clientBasket.next(newClientBasket);
    this.checkEmptyProductBasket();
    this.numberProductBasket.next(this.calculateNumberProductBasket());
    this.snackBarService.openSnackBar("Un(e) " + removeProduct.getName().toLowerCase() + " est supprimé(e) au panier !");
  }

  // create the new client basket when remove a product
  private createNewClientBasketWithRemove(oldClientBasket: BasketProduct[], removeProduct: Product): BasketProduct[] {
    oldClientBasket.find(product => {
      if (this.sameProduct(product, removeProduct)) {
        product.removeOneProduct();
      }
    })
    return oldClientBasket;
  }

  // check if in basket when don't exist product whit 0 number
  private checkEmptyProductBasket() {
    const newClientBasket = this.clientBasket.getValue().filter(basketProduct => basketProduct.getNumberProduct() > 0);
    this.clientBasket.next(newClientBasket);
  }

  private calculateNumberProductBasket(): number {
    const oldClientBasket = this.clientBasket.getValue();
    let numberProduct: number = 0;
    oldClientBasket.forEach(product => numberProduct += product.getNumberProduct());
    return numberProduct;
  }

  public getNumberProductBasket(): Observable<number> {
    return this.numberProductBasket.asObservable();
  }

  public getProductBasket(): Observable<BasketProduct[]> {
    return this.clientBasket.asObservable();
  }

  public buyBasket() {
    this.clientBasket.next([]);
    this.snackBarService.openSnackBar("Vous avez acheté votre panier !");
  }
}
