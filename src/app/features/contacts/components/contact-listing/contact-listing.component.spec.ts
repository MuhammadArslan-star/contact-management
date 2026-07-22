import { TestBed } from '@angular/core/testing';
import { ContactListingComponent } from './contact-listing.component';

describe('ContactListingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListingComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactListingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
