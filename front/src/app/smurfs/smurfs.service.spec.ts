import { TestBed } from '@angular/core/testing';

import { SmurfsService } from './smurfs.service';

describe('SmurfsService', () => {
  let service: SmurfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmurfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
