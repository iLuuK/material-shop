import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [{ path: '', component: MainComponent },{ path: 'basket', component: BasketComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
