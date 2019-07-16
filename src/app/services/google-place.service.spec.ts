import { TestBed } from '@angular/core/testing';

import { GooglePlaceService } from './google-place.service';

describe('GooglePlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GooglePlaceService = TestBed.get(GooglePlaceService);
    expect(service).toBeTruthy();
  });
});
