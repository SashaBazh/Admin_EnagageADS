import { TestBed } from '@angular/core/testing';

import { ServiceAssignmentsService } from './service-assignments.service';

describe('ServiceAssignmentsService', () => {
  let service: ServiceAssignmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAssignmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
