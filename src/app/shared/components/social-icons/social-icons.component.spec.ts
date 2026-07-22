import { TestBed } from '@angular/core/testing';
import { SocialIconsComponent } from './social-icons.component';
import { SocialPlatform } from '../../models/types';

describe('SocialIconsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialIconsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SocialIconsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should set platform and link attributes correctly', () => {
    const fixture = TestBed.createComponent(SocialIconsComponent);
    const component = fixture.componentInstance;
    component.platform = SocialPlatform.LINKEDIN;
    component.url = 'https://linkedin.com/in/test';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const anchor = compiled.querySelector('a');
    expect(anchor?.getAttribute('href')).toBe('https://linkedin.com/in/test');
    expect(anchor?.getAttribute('title')).toBe('linkedin');
  });
});
