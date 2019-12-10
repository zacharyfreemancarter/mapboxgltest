import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as mapboxgl from 'mapbox-gl';
 
@Injectable({
providedIn: 'root'
})
export class MapboxService {
 
constructor() {
  (mapboxgl as any).accessToken = environment.mapbox.accessToken;
}
 
getMarkers() {
  const geoJson = [{
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': ['80.20929129999999', '13.0569951']
    },
    'properties': {
      'message': 'Chennai'
    }
  }, {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': ['77.350048', '12.953847' ]
    },
    'properties': {
      'message': 'bangulare'
    }
  }];
  return geoJson;
}
}