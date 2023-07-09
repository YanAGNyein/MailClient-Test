import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FuseNavigation } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Injectable({ providedIn: 'root' })
export class UserModuleAccessService {
    private currentNavigationListSubject: BehaviorSubject<any[]>;

    constructor(
        private http: HttpClient,
        private _fuseNavigationService: FuseNavigationService,
        private router: Router
        
    ) {
        this.currentNavigationListSubject = new BehaviorSubject<any[]>([]);
    }

    public get currentNavigationListValue() {
        return this.currentNavigationListSubject.value;
    }

    getAllModuleByUserId(userid: number) {
        return this.http.get<FuseNavigation[]>(`${environment.apiUrl}/modules/GetModulesByUserId/${userid}`)
        .pipe(first())
                .subscribe(
                    data => {
                        // Unregister navigation 
                        if(this._fuseNavigationService.getNavigation('main') != undefined)
                        {
                            //Will produce console warning
                            console.log('unregistering');
                            this._fuseNavigationService.unregister('main');
                        }
                        // Register the navigation to the service
                        //this._fuseNavigationService.register('main', [...data]);
						this._fuseNavigationService.register('main', [...data][0].children);
                        console.log('setting current navigation');
                        this._fuseNavigationService.setCurrentNavigation('main');
                        this.currentNavigationListSubject.next(this.getURLList([...data][0].children));

                        this.router.navigate([[...data][0].children[0].children[0].url]);
                    });
    }

    getURLList(item) {
        let urlList = [];
        item.forEach(element => {
            urlList += element.children.map(this.getURLItem);
        });
        return urlList;
    }

    getURLItem(item) {
        return [item.url];
    }

}