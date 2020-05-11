import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  numberProductBasket$: Observable<number>;

  constructor(private clientService: ClientService) {
    this.numberProductBasket$ = clientService.getNumberProductBasket();
    this.numberProductBasket$.subscribe();
  }

  ngOnInit() {

  }

}
