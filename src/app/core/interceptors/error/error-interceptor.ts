import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

//Не работает, так как не используется HTTPClient
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      return throwError(() => err);
    })
  );
};
