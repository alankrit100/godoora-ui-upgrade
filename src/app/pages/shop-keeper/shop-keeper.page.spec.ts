import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopKeeperPage } from './shop-keeper.page';

describe('ShopKeeperPage', () => {
  let component: ShopKeeperPage;
  let fixture: ComponentFixture<ShopKeeperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopKeeperPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopKeeperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
