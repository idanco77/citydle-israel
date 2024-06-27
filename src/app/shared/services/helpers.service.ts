import {Injectable} from '@angular/core';

@Injectable()
export class HelpersService {
  getDifferenceInDays(firstDate: Date, today: Date) {
    const num  = new Date(today).setHours(0, 0, 0, 0) - firstDate.setHours(0, 0, 0, 0);
    return Math.round(num / 864e5);
  }

  getCurrentDateInUTC(): string {
    const currentDate = new Date();
    const offsetInMinutes = currentDate.getTimezoneOffset();
    const utcDate = new Date(currentDate.getTime() - offsetInMinutes * 60 * 1000);

    return utcDate.toISOString().split('T')[0];
  }

  getMarkers(markers: any, isDarkMode: boolean): any[] {
    const arr: any[] = [];
    markers.forEach((marker: any) => {
      marker.label.color = isDarkMode ? 'white' : 'black';
      marker.options.icon.url = marker.options.icon.url.replace(
        /-(light|dark)\./,
        '-' + (isDarkMode ? 'dark' : 'light') + '.'
      );
      arr.push(marker);
    });

    return arr;
  }
}
