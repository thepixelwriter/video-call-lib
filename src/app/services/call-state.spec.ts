import { TestBed } from '@angular/core/testing';

import { CallState } from './call-state';

describe('CallState', () => {
  let service: CallState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
