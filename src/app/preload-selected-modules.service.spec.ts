import { TestBed } from '@angular/core/testing';

import { PreloadSelectedModulesService } from './preload-selected-modules.service';

describe('PreloadSelectedModulesService', () => {
  let service: PreloadSelectedModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloadSelectedModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
