import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { GetApiService } from './get-api.service';

describe('GetApiService', () => {
  let service: GetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetApiService]
    });
    service = TestBed.inject(GetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
