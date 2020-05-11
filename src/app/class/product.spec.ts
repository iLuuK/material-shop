import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product({})).toBeTruthy();
  });

  const product = new Product({ name: 'name', type: 'type', longDetail: 'longDetail', shortDetail: 'shortDetail', stock: 3, price: 1, linkImage: 'linkImage', id: 1 });


  it('return name of product', () => {
    expect(product.getName()).toEqual('name');
});

it('return type of product', () => {
    expect(product.getType()).toEqual('type');
});

it('return long detail of product', () => {
    expect(product.getLongDetail()).toEqual('longDetail');
});

it('return short detail of product', () => {
    expect(product.getShortDetail()).toEqual('shortDetail');
});

it('return stock of product', () => {
    expect(product.getStock()).toEqual(3);
});

it('return price of product', () => {
    expect(product.getPrice()).toEqual(1);
});

it('return link image of product', () => {
    expect(product.getLinkImage()).toEqual("linkImage");
});

it('return id of product', () => {
    expect(product.getId()).toEqual(1);
});

it('return good stock after remove one of stock', () => {
  product.removeOneStock();
  expect(product.getStock()).toEqual(2);
});

it('return good stock after remove one of stock after stock to equal 0', () => {
  product.removeOneStock();
  product.removeOneStock();
  product.removeOneStock();
  product.removeOneStock();
  expect(product.getStock()).toEqual(0);
});

});
