import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';


import { ProductListComponent } from './product-list.component';
import { ApiService } from '../../services/api.service';
import { Product } from 'src/app/class/product';

describe('ProductListComponent', () => {

  const spyApiService = jasmine.createSpyObj('spyApiService', ['getProductList']);
  const mockProduct: Product = new Product({ name: 'name', type: 'type', longDetail: 'longDetail', shortDetail: 'shortDetail', stock: 3, price: 1, linkImage: 'linkImage', id: 1 });
  let mockProductList = Product[0];
  mockProductList[0] = mockProduct;

  spyApiService.getProductList.and.returnValue(of(mockProductList));


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule, Observable],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ProductListComponent,
        {
            provide: ApiService,
            useValue: spyApiService
        }
    ]
    })
      .compileComponents();
  }));

  let component: ProductListComponent;
  beforeEach(inject( [ProductListComponent], (_s: ProductListComponent) => {
      component = _s;
  }));

  it('should get data and format result to uppercase', () => {
 
    component.subscribeToProductList();
 
    expect(spyApiService.getProductList());
    expect(component.productList$).toBe(mockProductList);
         
});
  






  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
