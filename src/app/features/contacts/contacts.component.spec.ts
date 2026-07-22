import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ContactsComponent } from './contacts.component';

describe('ContactsComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactsComponent);
    // Constructor fires GET /contacts; flush an empty list.
    httpMock.expectOne((req) => req.url.endsWith('/contacts')).flush([]);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have no contact selected by default (empty state)', () => {
    const fixture = TestBed.createComponent(ContactsComponent);
    const component = fixture.componentInstance;
    httpMock.expectOne((req) => req.url.endsWith('/contacts')).flush([]);
    fixture.detectChanges();

    expect(component['selectedContact']()).toBeNull();
  });
});
