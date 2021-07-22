import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import moment from 'moment';
import { StoresPage } from './stores.page';
import { AppService } from 'src/app/services/app.service';


@Injectable({
  providedIn: 'root'
})
export class StoreDetailResolver implements Resolve<any> {
  constructor(private appService: AppService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const query = {
      loginId: route.paramMap.get('id'),
      date: moment().format('DD-MM-YYYY')
    };
    return this.appService.getStoreDetail(query);
  }
}

const routes: Routes = [
  {
    path: '',
    component: StoresPage,
    resolve: {
      storeDetail: StoreDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresPageRoutingModule {}
