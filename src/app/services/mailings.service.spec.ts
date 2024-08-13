import { TestBed } from '@angular/core/testing';

import { MailingsService } from './mailings.service';

describe('MailingsService', () => {
  let service: MailingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
