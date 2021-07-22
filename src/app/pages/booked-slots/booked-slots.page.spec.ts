import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookedSlotsPage } from './booked-slots.page';

describe('BookedSlotsPage', () => {
  let component: BookedSlotsPage;
  let fixture: ComponentFixture<BookedSlotsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedSlotsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookedSlotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
