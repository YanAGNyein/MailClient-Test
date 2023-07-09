import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

import { User } from 'app/_models';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { CryptoService } from 'app/_services/crypto.service'
//XL change ${config.apiUrl} to environment.apiUrl
import { environment } from 'environments/environment';

// Get UserRoles Enum
import { UserRoles } from '@/_models/Enums/user-roles.enum';

import {UserModuleAccessService } from "./usermoduleaccess.service";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    UserRoles = UserRoles;

    //XL 
    constructor(private http: HttpClient, 
                private userModuleAccessService: UserModuleAccessService,
                private _fuseNavigationService: FuseNavigationService,
                private cryptoService: CryptoService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(loginname, password) {
         loginname = this.cryptoService.EncryptInput1(loginname);
         password = this.cryptoService.EncryptInput1(password);
        
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { loginname, password })
            .pipe(
                timeout(300000)
                ,map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                // Expect an array of user Roles, single user role also will return an array of 1 value.
                var userRoles = user.userRoles.split(',').map(Number);

                // Get UserModuleAccess
                this.userModuleAccessService.getAllModuleByUserId(user.userID);
                
                return user;
            }));

    }

    logout() {
        if (this.currentUserValue)
        {
            this.http.post(`${environment.apiUrl}/users/logout`, { } ).subscribe(
                (data) => {
                    //console.log('success logout');
                    //console.log(data); 
                },
                (error) => { 
                    //console.log('failed logout');
                    //console.log(error);
                }
            );
        }
        // remove user from local storage
        localStorage.removeItem('currentUser');

        this.currentUserSubject.next(null);
    }

    public updateSavedFilter(prop: string, data: any): void {
        this.currentUserValue[prop] = JSON.stringify(data);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUserValue));
    }
}
