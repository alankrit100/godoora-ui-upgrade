import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageModule } from './pages/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmModalPageModule } from './pages/confirm-modal/confirm-modal.module';
import { CreateSlotPageModule } from './pages/create-slot/create-slot.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HeaderComponent } from './components/header/header.component';
import { MenuPage } from './components/menu/menu.page';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { OffSeasonComponent } from './components/off-season/off-season.component';
import { FooterPage } from './components/footer/footer.page';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { SharedModule } from './shared.module';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('520508100358-nc2pkgmhrss0ar89bqdhqtun3ftshcuh.apps.googleusercontent.com')
  },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider("Facebook-App-Id")
  // }
]);

export function provideConfig() {
  return config;
}

// export function getGoogleAnalyticscode() {
//   let branch = 'default';
//   if (localStorage.getItem('branch')) {
//     branch = localStorage.getItem('branch');
//   }
//   const pathArray = window.location.pathname.split('/');
//   if (pathArray && pathArray.length >= 3 && pathArray.includes('landing')) {
//     branch = pathArray[1];
//   }
//   localStorage.setItem('branch', branch);
//   const branchList = Vendors[window.location.host];
//   if (branchList && branchList.length) {
//     vendorDetail = branchList.find((item) => {
//       return item.branch === branch;
//     });
//     if (!vendorDetail) {
//       vendorDetail = branchList[branchList.length - 1];
//     }
//     return vendorDetail ? vendorDetail.gAnalyticscode : 'UA-144064030-1';
//   }
// }

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LoginPageModule,
    SocialLoginModule,
    CreateSlotPageModule,
    ConfirmModalPageModule,
    SharedModule,
    // NgxGoogleAnalyticsModule.forRoot(getGoogleAnalyticscode()),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent, HeaderComponent, MenuPage, FooterPage, ComingSoonComponent, OffSeasonComponent],
  entryComponents: [],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
