import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  categorieList = [
    { name: "Fruit" },
    { name: "Meuble" }
  ];

  myForm = new FormGroup({
    categories: new FormControl()
  });

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.myForm.get('categories').valueChanges.subscribe(
      (categorie: string) => {
        console.log(categorie);
        this.apiService.getDataFromApi(categorie.toLowerCase());
      });
  }

}
