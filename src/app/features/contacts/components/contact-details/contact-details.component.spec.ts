import { TestBed } from '@angular/core/testing';
import { ContactDetailsComponent } from './contact-details.component';

describe('ContactDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
