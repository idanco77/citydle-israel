export const LIGHT: google.maps.MapTypeStyle[] = [
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0f172a"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

export const DARK: google.maps.MapTypeStyle[] = [
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "color": "#272d39"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "color": "#256950"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "color": "#3c546c"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "color": "#7494b2"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "color": "#3c546c"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "color": "#272d39"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "color": "#25467b"
      }
    ]
  }
];

export const MAP_SETTINGS = {
  center: {lat: 31.496931, lng: 34.994928},
  zoom: 7.5,
  streetViewControl: false,
  disableDefaultUI: true,
  scrollwheel: true,
  fullscreenControl: false,
  mapTypeControl: false,
  zoomControl: false,
  styles: LIGHT
};
