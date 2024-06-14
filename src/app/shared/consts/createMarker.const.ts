import {Marker} from 'src/app/shared/models/marker.model';

export const createMarker = (cityObj: Marker, isGreenMarker: boolean = false, isDarkMode = false): any => {
  const marker: any = {
    position: {lat: cityObj.lat, lng: cityObj.lng},
    options: {draggable: false},
    label: {text:cityObj.name, color: isDarkMode ? 'white' : 'black'},
  };

  if (isGreenMarker) {
    marker.options.icon = {url: 'assets/green-pin.png'};
  }

  return marker;
};
