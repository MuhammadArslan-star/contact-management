import { TestBed } from '@angular/core/testing';
import { UserAvatarComponent } from './user-avatar.component';
import { AvatarStyle } from '../../models/types';

describe('UserAvatarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAvatarComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UserAvatarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display initials when imageUrl is null', () => {
    const fixture = TestBed.createComponent(UserAvatarComponent);
    const component = fixture.componentInstance;
    component.name = 'John Doe';
    component.imageUrl = null;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('JD');
  });
});
