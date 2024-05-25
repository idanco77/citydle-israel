import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ErrorMessageService {
  constructor(private snackBar: MatSnackBar) {
  }

  showErrorMessage() {
    this.snackBar.open('יש לבחור יישוב מתוך הרשימה', 'X', {
      duration: 1500,
      verticalPosition: 'top'
    });
  }

}
