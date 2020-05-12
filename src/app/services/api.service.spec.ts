import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
    providers: [ApiService]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });


  it(
    'test',
    async(inject(
      [HttpTestingController, ApiService],
      (httpMock: HttpTestingController, apiService: ApiService) => {
        const mockData = [{
          "name": "testFruit",
          "type": "fruit",
          "longDetail": "La banane est le fruit ou la baie dérivant de l’inflorescence du bananier. Les bananes sont des fruits très généralement stériles issus de variétés domestiquées. Seuls les fruits des bananiers sauvages et de quelques cultivars domestiques contiennent des graines.",
          "shortDetail": "Un fruit jaune.",
          "stock": 0,
          "price": 1,
          "linkImage": "banane",
          "id": 1
        }];

        apiService.getDataFromApi();
        apiService.getProductList().subscribe((data: any) => {
          console.log(data);
          expect(data[0].getName()).toBe('testFruit');
        });


        const mockReq = httpMock.match(apiService.getUrlService());

        expect(mockReq[0].cancelled).toBeFalsy();
        expect(mockReq[0].request.method).toEqual('GET');
        expect(mockReq[0].request.responseType).toEqual('json');
        mockReq[0].flush({data:"ddd"});
        console.log(mockReq[0]);

        httpMock.verify();
      }
    )));



});
