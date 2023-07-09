import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationService } from 'app/_services';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private router: Router,
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        //return next.handle(request).catch(err => this.handleError(err));
        return next.handle(request).pipe(catchError(x=> this.handleAuthError(x)));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        let errorMsg;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMsg = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        if (err.status === 404 || err.status === 403 || err.status === 401) {
            //alert(`Invalid session: ${errorMsg}`);
            alert('Invalid session.');
            this.router.navigate(['/auth/login-2']);
        }
        //console.error(errorMsg);
        //return throwError(errorMsg);
        // return the original error msg to the frontend codes calling the API
        return throwError(err);
    }

}


export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ];