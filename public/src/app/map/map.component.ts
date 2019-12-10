import { environment } from '../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {MapboxService} from '../mapbox.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/twotonewark2/ck3ywoi3d86oc1cpd3p796fzg';
  lat = 37.75;
  lng = -122.41;
  message = "hello world!"
  source:any;
  markers:any;
  constructor(
    private mapboxService: MapboxService
  ) { }
  ngOnInit() {
    this.initializeMap()
    this.map.on('load', (event) => {
      this.map.addSource('customMarker', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: []
              }
        });
        const markers = this.mapboxService.getMarkers();
        this.source = this.map.getSource('customMarker')
        const data = {
          type: 'FeatureCollection',
          features: markers
        };
      this.source.setData(data)
     this.map.addLayer({
            id: 'customMarketid',
            source: 'customMarker',
            type: 'symbol',
            layout: {
              'text-field': '{message}',
              'text-size': 24,
              'text-transform': 'uppercase',
              'icon-image': 'marker-15',
              'text-offset': [0, 1.5]
            },
            paint: {
              'text-color': '#f16624',
              'text-halo-color': '#fff',
              'text-halo-width': 2
            }
        });
      this.map.on('click','customMarketid', function(e) {
        console.log('hello')
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.message)
          .addTo(this)
      });
    });
  }
  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }
    this.buildMap()
  }
  buildMap(){
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    })
  }
}