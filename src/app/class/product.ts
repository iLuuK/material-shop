export class Product {
  private name: string;
  private type: string;
  private longDetail: string;
  private shortDetail: string;
  private stock: number;
  private price: number;
  private linkImage: string;
  private id: number;

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  getName(): string {
    return this.name;
  }
  getType(): string {
    return this.type;
  }
  getLongDetail(): string {
    return this.longDetail;
  }
  getShortDetail(): string {
    return this.shortDetail;
  }
  getStock(): number {
    return this.stock;
  }
  getPrice(): number {
    return this.price;
  }
  getLinkImage(): string {
    return this.linkImage;
  }
  getId(): number {
    return this.id;
  }

  removeOneStock() {
    this.stock--;
    this.stock = this.stock < 0 ? 0 : this.stock;
  }
}
