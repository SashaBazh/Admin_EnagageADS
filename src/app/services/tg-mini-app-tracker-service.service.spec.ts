import { TestBed } from '@angular/core/testing';

import { TgMiniAppTrackerServiceService } from './tg-mini-app-tracker-service.service';

describe('TgMiniAppTrackerServiceService', () => {
  let service: TgMiniAppTrackerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TgMiniAppTrackerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
