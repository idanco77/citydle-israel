import {Marker} from 'src/app/shared/models/marker.model';

export const createMarker = (cityObj: Marker, color: 'green' | 'red' | 'blue' = 'red', isDarkMode = false): any => {
  const marker: any = {
    position: {lat: cityObj.lat, lng: cityObj.lng},
    options: {draggable: false},
    label: {text: cityObj.name, color: isDarkMode ? 'white' : 'black', backgroundColor: 'red'},
  };
  const template = isDarkMode ? 'dark' : 'light';
  marker.options.icon = {url: 'assets/' + color + '-' + template + '.png'};

  return marker;
};
