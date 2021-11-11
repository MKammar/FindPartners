import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapViewComponent } from './map-view/map-view.component';
import { PartnersSearchComponent } from './partners-search/partners-search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Find', component: PartnersSearchComponent},
  {path: 'ViewOnMap/:longitude/:latitude', component: MapViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PartnersSearchComponent]
