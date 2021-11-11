import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {
  private searchUrl: string ="";


  constructor(private http: HttpClient) {}

  //calling api
  getPartners(Ldistance: any, Hdistance: any) : Observable<any> {
    this.searchUrl = "http://localhost:3080/listPartners/"+Ldistance+"/"+Hdistance;
    return this.http.get(this.searchUrl);
  }
}
