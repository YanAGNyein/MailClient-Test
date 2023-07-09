import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//XL change ${config.apiUrl} to environment.apiUrl
import { environment } from 'environments/environment';
import { UserRole } from '@/_models/userRole';
import { retryWhen, delay, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserRoleService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<UserRole[]> {
        //XL change ${config.apiUrl} to environment.apiUrl
        return this.http.get<UserRole[]>(`${environment.apiUrl}/userroles`).pipe(retryWhen(errors => errors.pipe(delay(1000), take(5))));
    }
}