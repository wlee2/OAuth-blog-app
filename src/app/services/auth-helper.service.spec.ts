import { TestBed } from '@angular/core/testing';

import { AuthHelperService } from './auth-helper.service';

describe('AuthHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthHelperService = TestBed.get(AuthHelperService);
    expect(service).toBeTruthy();
  });
});
