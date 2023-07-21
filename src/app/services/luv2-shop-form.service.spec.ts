import { TestBed } from '@angular/core/testing';

import { Luv2ShopFormService } from './luv2-shop-form.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

fdescribe('Luv2ShopFormService', () => {
  let service: Luv2ShopFormService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],
      providers: [ Luv2ShopFormService]});
    service = TestBed.inject(Luv2ShopFormService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all countries',()=>{
    let countries: Country[] =[{id:1,name:'Turkey',code:'Tr'}];
    service.getCountries().subscribe(data=>{
      expect(data).toBe(countries);
    });
    const req = httpController.expectOne('http://localhost:8080/api/countries');
    expect(req.request.method).toBe('GET');
    req.flush({ _embedded: { countries: countries } });
  });

  it('should get states for country',()=>{
    let states: State[] =[{id:6,name:'Ankara'}];
    service.getStates('TR').subscribe(data=>{
      expect(data).toBe(states);
    });
    const req = httpController.expectOne('http://localhost:8080/api/states/search/findByCountryCode?code=TR');
    expect(req.request.method).toBe('GET');
    req.flush({ _embedded: { states: states } });
  });

  it('should generate an array of credit card months', () => {
    const startMonth = 7; 
    const mockMonths: number[] =[];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      mockMonths.push(theMonth);
    }

    service.getCreditCardMonths(startMonth).subscribe((months) => {
      expect(months).toEqual(mockMonths);
    });
  });

  it('should generate an array of credit card years', () => {
    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;
    const mockYears: number[] = [];
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      mockYears.push(theYear);
    }

    service.getCreditCardYears().subscribe((years) => {
      expect(years).toEqual(mockYears);
    });
  });

});
