import {City} from 'src/app/shared/models/city.model';

export const createMarker = (cityObj: City, isGreenMarker: boolean = false): any => {
  const isDarkMode = localStorage.getItem('isDarkMode') === '1';
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
