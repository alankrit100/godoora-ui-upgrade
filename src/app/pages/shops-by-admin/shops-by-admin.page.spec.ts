import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopsByAdminPage } from './shops-by-admin.page';

describe('ShopsByAdminPage', () => {
  let component: ShopsByAdminPage;
  let fixture: ComponentFixture<ShopsByAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsByAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopsByAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
