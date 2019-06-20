import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCompletedComponent } from './auth-completed.component';

describe('AuthCompletedComponent', () => {
  let component: AuthCompletedComponent;
  let fixture: ComponentFixture<AuthCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
