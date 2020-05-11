import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';


import { ClientService } from './client.service';
import { Product } from '../class/product';
import { BasketProduct } from '../class/basket-product';

describe('ClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ MatSnackBarModule ]
  }));

  it('should be created', () => {
    const service: ClientService = TestBed.get(ClientService);
    expect(service).toBeTruthy();
  });
  
});

