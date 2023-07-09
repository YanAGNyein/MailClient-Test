import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'app/_models';

//XL change ${config.apiUrl} to environment.apiUrl
import { environment } from 'environments/environment';
import { retryWhen, delay, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { CryptoService } from 'app/_services/crypto.service'

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private authonticationService: AuthenticationService, private cryptoService: CryptoService) { }

    getAll() {
        //XL change ${config.apiUrl} to environment.apiUrl
        return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(retryWhen(errors => errors.pipe(delay(1000), take(5))));
    }

    getAllByUserID(UserID : number) {
        //XL change ${config.apiUrl} to environment.apiUrl
        return this.http.get<User[]>(`${environment.apiUrl}/users/getall${UserID}`).pipe(retryWhen(errors => errors.pipe(delay(1000), take(5))));
    }

    updateSelectedToggleCols(webPage: string, selectedToggleColumns: string[]) {
        return this.http.post(`${environment.apiUrl}/users/updateSelectedToggleCols`, {
            'userID': this.authonticationService.currentUserValue.userID,
            'webPage': webPage,
            'selectedToggleColumns': selectedToggleColumns
        });
    }
}