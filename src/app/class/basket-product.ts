import { Product } from "./product";

export class BasketProduct extends Product {
  private numberProduct: number;
  constructor(
    product: Product
  ) {
    super(product);
    this.numberProduct = 1;
  }
  getNumberProduct(): number {
    return this.numberProduct;
  }
  removeOneProduct() {
    this.numberProduct--;
    this.numberProduct = this.numberProduct < 0 ? 0 : this.numberProduct;
  }
  addOneProduct() {
    this.numberProduct++;
  }
}
