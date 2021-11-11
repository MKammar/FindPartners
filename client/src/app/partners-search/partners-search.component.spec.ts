import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PartnersSearchComponent } from './partners-search.component';
import { GetApiService } from '../services/get-api.service';
import { NgxPaginationModule }  from 'ngx-pagination';
import { of } from 'rxjs';

describe('PartnersSearchComponent', () => {
  let component: PartnersSearchComponent;
  let fixture: ComponentFixture<PartnersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule , NgxPaginationModule],
      providers: [GetApiService],
      declarations: [ PartnersSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test searchPartners function', () => {
    const service = TestBed.inject(GetApiService);
    const names = [{ name: 'Blue Square 360' }, {name: "Gallus Consulting"}];
    spyOn(service, 'getPartners').and.returnValue(of(names));
    component.searchPartners(1,20);
    expect(component.totalRec).toBe(2);
  });

  it('test the parameters of searchPaterns function', () => {
    component.searchPartners(100,20);
    expect(component.message).toBe("not valid");
  });

});
