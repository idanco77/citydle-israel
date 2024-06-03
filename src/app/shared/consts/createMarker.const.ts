import {City} from 'src/app/shared/models/city.model';

export const createMarker = (cityObj: City, isGreen: boolean = false): any => {
  const marker: any = {
    position: {lat: cityObj.lat, lng: cityObj.lng},
    options: {draggable: false},
    label: {text:cityObj.name, color: 'green'},
  };

  if (isGreen) {
    marker.options.icon = {url: 'assets/green-pin.png'};
  }

  return marker;
};
