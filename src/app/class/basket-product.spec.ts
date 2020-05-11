import { BasketProduct } from './basket-product';
import { Product } from './product';

describe('BasketProduct', () => {
    it('should create an instance', () => {
        expect(new BasketProduct(new Product({}))).toBeTruthy();
    });

    const basketProduct = new BasketProduct(new Product({ name: 'name', type: 'type', longDetail: 'longDetail', shortDetail: 'shortDetail', stock: 3, price: 1, linkImage: 'linkImage', id: 1 }));

    it('return number of product in basket', () => {
        expect(basketProduct.getNumberProduct()).toEqual(1);
    });

    it('return number of product in basket after one remove product', () => {
        basketProduct.removeOneProduct();
        expect(basketProduct.getNumberProduct()).toEqual(0);
    });

    it('return number of product in basket after one remove product when number is 0', () => {
        basketProduct.removeOneProduct();
        expect(basketProduct.getNumberProduct()).toEqual(0);
    });

    it('return number of product in basket after one add product', () => {
        basketProduct.addOneProduct();
        expect(basketProduct.getNumberProduct()).toEqual(1);
    });
});
