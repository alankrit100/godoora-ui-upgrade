import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserShopsPage } from './user-shops.page';

describe('UserShopsPage', () => {
  let component: UserShopsPage;
  let fixture: ComponentFixture<UserShopsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShopsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserShopsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
