import { createInjectable } from 'ngxtension/create-injectable';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const MatSnackBarService = createInjectable(() => {
  const _router = inject(Router);
  const _matSnackBar = inject(MatSnackBar);
  
  const success = (message) => {
    _matSnackBar.open(message, '×', {
      duration: 4500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-success', 'success'],
    });
  }

  const error = (message) => {
    _matSnackBar.open(message, '×', {
      duration: 7500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-error', 'error'],
    });
  }

  const warning = (message) => {
    _matSnackBar.open(message, '×', {
      duration: 7500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-warn', 'warning'],
    });
  }

  return {
    success,
    error,
    warning,
  };


});