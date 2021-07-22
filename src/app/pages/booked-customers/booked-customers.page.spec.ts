import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookedCustomersPage } from './booked-customers.page';

describe('BookedCustomersPage', () => {
  let component: BookedCustomersPage;
  let fixture: ComponentFixture<BookedCustomersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedCustomersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookedCustomersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
