import { TestBed } from '@angular/core/testing';

import { TaskVirificationService } from './task-virification.service';

describe('TaskVirificationService', () => {
  let service: TaskVirificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskVirificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
