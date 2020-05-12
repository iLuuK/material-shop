import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Product } from "../class/product";
import { HttpClient } from "@angular/common/http";
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private productList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient, private snackBarService: SnackBarService) {
    this.getDataFromApi();
  }

  public getUrlService(): string {
    return "../../assets/data.json";
  }
  public getDataFromApi(type: string = 'all') {
    this.http
      .get<Product[]>(this.getUrlService()).pipe()
      .toPromise()
      .then((data) => {
        let productList;
        if (type === "all") {
          productList = data.map(product => new Product(product));
        } else {
          productList = data.map(product => new Product(product)).filter(product => product.getType() === type);
        }
        this.productList.next(productList);
        this.snackBarService.openSnackBar("Chargement des donnes réussies");
      })
      .catch(error => {
        this.snackBarService.openSnackBar("Erreur lors du chargement des données")
      });
  }
  public getProductList(): Observable<Product[]> {
    return this.productList.asObservable();
  }
  public productBuy(productBuy: Product) {
    const oldProductList = this.productList.getValue();
    const newProductlist = oldProductList.map(product => {
      if (product.getId() === productBuy.getId()) {
        product.removeOneStock();
      }
      return product;
    })
    this.productList.next(newProductlist);
  }
}