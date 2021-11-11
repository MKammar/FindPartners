import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GetApiService } from '../services/get-api.service';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-partners-search',
  templateUrl: './partners-search.component.html',
  styleUrls: ['./partners-search.component.css']
})
export class PartnersSearchComponent implements OnInit {

  Lsearch: string = "";
  Hsearch: string = "";
  public partners: any[];
  totalRec: any;
  page: number = 1;
  private delaySearch: boolean = true;
  private timer: any;
  message: string = "";

  constructor(private api: GetApiService , private router: Router) {
    this.partners = [];
    this.totalRec = 0;

    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects
      ) {
        this.partners = [];
        sessionStorage.clear();
      }
    })
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("partners") != null){
      this.partners = JSON.parse(sessionStorage.getItem("partners")!);
      this.Lsearch = sessionStorage.getItem("Ldistance")!;
      this.Hsearch = sessionStorage.getItem("Hdistance")!;
    }
  }

  ResetRecords(){
    this.totalRec = 0;
    this.partners = [];
    sessionStorage.clear();
  }

  //function that call api to get partners
  searchPartners(Ldistance: number, Hdistance: number){
    if(Ldistance > Hdistance) {
      this.message="not valid"
      this.ResetRecords();
    }

    else if(Ldistance == 0 || Hdistance == 0 ){
      this.message="Please enter  valid number";
      this.ResetRecords();
    }

    else if(Hdistance && !isNaN(Ldistance)){
        this.message="";
        this.api.getPartners(Ldistance, Hdistance)
        .subscribe(res => {
          this.partners = res;
          if(this.partners.length == 0){
            this.message = "No partners avialable in the given range"
          }
          this.totalRec = res.length;
          sessionStorage.setItem("partners",JSON.stringify(this.partners));
          sessionStorage.setItem("Ldistance",JSON.stringify(Ldistance));
          sessionStorage.setItem("Hdistance",JSON.stringify(Hdistance));

        });

    }

    else {
      this.message="";
      this.ResetRecords();
    }
  }

  //funtion that call searchPartners function
  onSubmit() {
    var lower = +this.Lsearch;
    var higher = +this.Hsearch;
    this.searchPartners(lower,higher);
}

  onReset(){
    this.partners = [];
    this.Lsearch="";
    this.Hsearch="";
    this.message="";
    this.page = 1;
    sessionStorage.clear();
  }

  WebURL(url: any) {
    window.location.href = `${url}`
  }
}
