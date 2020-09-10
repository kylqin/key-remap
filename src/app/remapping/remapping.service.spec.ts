import { TestBed } from '@angular/core/testing';

import { RemappingService } from './remapping.service';

describe('RemappingService', () => {
  let service: RemappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
