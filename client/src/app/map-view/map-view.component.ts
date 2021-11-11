import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare const L : any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  long: any;
  latit: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap
    .subscribe(params => {
      this.long = params.get("longitude");
      this.latit = params.get("latitude");
    })

    //Finding partner in the  map
    var mymap = L.map('mapid').setView([this.long, this.latit], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFhcGkiLCJhIjoiY2t2MWgxb2pqMDJneDJuczM4d2IzaDBnOCJ9.1xCjCF1HeOAG9-w4xk9DSw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);

  var mainMarker = L.marker([51.5144636, -0.142571]).addTo(mymap);
  mainMarker.bindPopup("<b>Your Location.").openPopup();
  var Marker = L.marker([this.long, this.latit]).addTo(mymap);
  Marker.bindPopup("<b>Your Partner Location.").openPopup();
  }

}
