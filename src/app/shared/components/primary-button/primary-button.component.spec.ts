import { TestBed } from '@angular/core/testing';
import { PrimaryButtonComponent } from './primary-button.component';

describe('PrimaryButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryButtonComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PrimaryButtonComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render label correctly', () => {
    const fixture = TestBed.createComponent(PrimaryButtonComponent);
    const component = fixture.componentInstance;
    component.label = 'Send Message';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Send Message');
  });
});
