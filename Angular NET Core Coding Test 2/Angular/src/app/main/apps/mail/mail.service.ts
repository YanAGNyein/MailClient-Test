import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { HeaderMail, Mail } from 'app/main/apps/mail/mail.model';
import { environment } from 'environments/environment';
import { MailFakeDb } from 'app/fake-db/mail';
import { IfStmt, unescapeIdentifier } from '@angular/compiler';

@Injectable()
export class MailService implements Resolve<any>
{
    mails: Mail[];
    selectedMails: Mail[];
    currentMail: Mail;
    searchText = '';

    headerMail :HeaderMail;
    pageNumber :any;
    rowsOfPage = 10;

    folders: any[];
    filters: any[];
    labels: any[];
    routeParams: any;

    onMailsChanged: BehaviorSubject<any>;
    onSelectedMailsChanged: BehaviorSubject<any>;
    onCurrentMailChanged: BehaviorSubject<any>;
    onFoldersChanged: BehaviorSubject<any>;
    onFiltersChanged: BehaviorSubject<any>;
    onLabelsChanged: BehaviorSubject<any>;
    onSearchTextChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.selectedMails = [];
        this.onMailsChanged = new BehaviorSubject([]);
        this.onSelectedMailsChanged = new BehaviorSubject([]);
        this.onCurrentMailChanged = new BehaviorSubject([]);
        this.onFoldersChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onLabelsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFolders(),
                this.getFilters(),
                this.getLabels(),
                this.getMails()
            ]).then(
                () => {
                    if ( this.routeParams.mailId )
                    {
                        this.setCurrentMail(this.routeParams.mailId);
                    }
                    else
                    {
                        this.setCurrentMail(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getMails();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getMails();
                        }
                    });

                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get all folders
     *
     * @returns {Promise<any>}
     */
    getFolders(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // this._httpClient.get('api/mail-folders')
            //     .subscribe((response: any) => {
            //         this.folders = response;
            //         this.onFoldersChanged.next(this.folders);
            //         resolve(this.folders);
            //     }, reject);

            this.folders = MailFakeDb.folders;
            this.onFoldersChanged.next(this.folders);
            resolve(this.folders);
        });
    }

    /**
     * Get all filters
     *
     * @returns {Promise<any>}
     */
    getFilters(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // this._httpClient.get('api/mail-filters')
            //     .subscribe((response: any) => {
            //         this.filters = response;
            //         this.onFiltersChanged.next(this.filters);
            //         resolve(this.filters);
            //     }, reject);
            this.filters = MailFakeDb.filters;
            this.onFiltersChanged.next(this.filters);
            resolve(this.filters);
        });
    }

    /**
     * Get all labels
     *
     * @returns {Promise<any>}
     */
    getLabels(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // this._httpClient.get('api/mail-labels')
            //     .subscribe((response: any) => {
            //         this.labels = response;
            //         this.onLabelsChanged.next(this.labels);
            //         resolve(this.labels);
            //     }, reject);
            this.labels = MailFakeDb.labels;
            this.onLabelsChanged.next(this.labels);
            resolve(this.labels);
        });
    }

    /**
     * Get all mails
     *
     * @returns {Promise<Mail[]>}
     */
    getMails(): Promise<HeaderMail>
    {
        if ( this.routeParams.labelHandle )
        {
            return this.getMailsByLabel(this.routeParams.labelHandle);
        }
        if ( this.routeParams.filterHandle )
        {
            return this.getMailsByFilter(this.routeParams.filterHandle);
        }
        return this.getMailsByFolder(this.routeParams.folderHandle,this.pageNumber);
    }

    /**
     * Get mails by folder
     *
     * @param handle
     * @returns {Promise<Mail[]>}
     */
    getMailsByFolder(handle,pNumber): Promise<HeaderMail>
    {
        return new Promise((resolve, reject) => {
            var folders = MailFakeDb.folders.filter(x => x.handle == handle);
            var folderId = folders[0].id;
            var pageNumber;
            if(pNumber == undefined)
            {
                pageNumber = 1;
            }
            else
            {
                pageNumber = pNumber;
            }
            const rowsOfPage = this.rowsOfPage;

            this._httpClient.get(`${environment.apiUrl}/mails/folderData/${folderId}/${pageNumber}/${rowsOfPage}`)
                .subscribe((mails: any) => {
                    //    this.mails = mails.map(mail =>{
                    //         return new Mail(mail);
                    //     });

                     this.headerMail = mails;
                     this.headerMail.folderId = folderId;
                     this.mails = this.headerMail.results;
                    //this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);

                    this.headerMail.results = FuseUtils.filterArrayByString(this.headerMail.results, this.searchText);
                    //this.onMailsChanged.next(this.mails);

                    this.onMailsChanged.next(this.headerMail);
                    //resolve(this.mails);
                    resolve(this.headerMail);
                    return new HeaderMail(this.headerMail);
                }, reject);
        });
    }

    /**
     * Get mails by filter
     *
     * @param handle
     * @returns {Promise<Mail[]>}
     */
    getMailsByFilter(handle): Promise<HeaderMail>
    {
        return new Promise((resolve, reject) => {

            // this._httpClient.get('api/mail-mails?' + handle + '=true')
            //     .subscribe((mails: any) => {

            //         this.mails = mails.map(mail => {
            //             return new Mail(mail);
            //         });

            //         this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);

            //         this.onMailsChanged.next(this.mails);

            //         resolve(this.mails);

            //     }, reject);

            // TODO: if getMailsByFilter is to be used, need to link to actual API and not in memory DB
            var mails = MailFakeDb.mails.filter(x => x[handle] == true);
            this.mails = mails.map(mail => {
                return new Mail(mail);
            });

            this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);

            this.onMailsChanged.next(this.mails);

           // resolve(this.mails);
        });
    }
    /**
     * Get mails by label
     *
     * @param handle
     * @returns {Promise<Mail[]>}
     */
    getMailsByLabel(handle): Promise<HeaderMail>
    {
        return new Promise((resolve, reject) => {
            // this._httpClient.get('api/mail-labels?handle=' + handle)
            //     .subscribe((labels: any) => {

            //         const labelId = labels[0].id;
            //         this._httpClient.get(`${environment.apiUrl}/mails/label/${labelId}`)
            //             .subscribe((mails: any) => {

            //                 this.mails = mails.map(mail => {
            //                     return new Mail(mail);
            //                 });

            //                 this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);

            //                 this.onMailsChanged.next(this.mails);

            //                 resolve(this.mails);

            //             }, reject);
            //     });
            var labels = MailFakeDb.labels.filter(x => x.handle == handle);
            const labelId = labels[0].id;
            this._httpClient.get(`${environment.apiUrl}/mails/label/${labelId}`)
                .subscribe((mails: any) => {

                    this.mails = mails.map(mail => {
                        return new Mail(mail);
                    });

                    this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);

                    this.onMailsChanged.next(this.mails);

                    //resolve(this.mails); //cmt by mh

                }, reject);
        });
    }

    /**
     * Toggle selected mail by id
     *
     * @param id
     */
    toggleSelectedMail(id): void
    {
        // First, check if we already have that mail as selected...
        if ( this.selectedMails.length > 0 )
        {
            for ( const mail of this.selectedMails )
            {
                // ...delete the selected mail
                if ( mail.id === id )
                {
                    const index = this.selectedMails.indexOf(mail);

                    if ( index !== -1 )
                    {
                        this.selectedMails.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedMailsChanged.next(this.selectedMails);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedMails.push(
            this.mails.find(mail => {
                return mail.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedMails.length > 0 )
        {
            this.deselectMails();
        }
        else
        {
            this.selectMails();
        }

    }

    /**
     * Select mails
     *
     * @param filterParameter
     * @param filterValue
     */
    selectMails(filterParameter?, filterValue?): void
    {
        this.selectedMails = [];

        // If there is no filter, select all mails
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedMails = this.mails;
        }
        else
        {
            this.selectedMails.push(...
                this.mails.filter(mail => {
                    return mail[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }

    /**
     * Deselect mails
     */
    deselectMails(): void
    {
        this.selectedMails = [];

        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }

    /**
     * Set current mail by id
     *
     * @param id
     */
    setCurrentMail(id): void
    {
        this.currentMail = this.mails.find(mail =>{
            return mail.id === id;
        });
        this.onCurrentMailChanged.next(this.currentMail);
    }

    /**
     * Toggle label on selected mails
     *
     * @param labelId
     */
    toggleLabelOnSelectedMails(labelId): void
    {
        this.selectedMails.map(mail => {

            mail.label = labelId;
        });
    }

    /**
     * Set folder on selected mails
     *
     * @param folderId
     */
    setFolderOnSelectedMails(folderId): void
    {
        this.selectedMails.map(mail => {
            mail.folder = folderId;

            this.updateMail(mail);
        });

        this.deselectMails();
    }

    /**
     * Update the mail
     *
     * @param mail
     * @returns {Promise<any>}
     */
    updateMail(mail): Promise<any>
    {
        return new Promise((resolve, reject) => {

            // this._httpClient.post('api/mail-mails/' + mail.id, {...mail})
            //     .subscribe(response => {

            //         this.getMails().then(mails => {

            //             if ( mails && this.currentMail )
            //             {
            //                 this.setCurrentMail(this.currentMail.id);
            //             }

            //             resolve(mails);

            //         }, reject);
            //     });

            // TODO: if updateMail is to be used, need to link to actual API and not in memory DB
            var response = MailFakeDb.mails.push(...mail);
            this.getMails().then(mails => {

                if ( mails && this.currentMail )
                {
                    this.setCurrentMail(this.currentMail.id);
                }

                resolve(mails);

            }, reject);
        });
    }

    resendMail(mail: Mail) {
        //XL change ${config.apiUrl} to environment.apiUrl
        // POST requires a body to be specified, but our backend API method don't need it, thus put ""
        return this._httpClient.post(`${environment.apiUrl}/mails/m/${mail.id}/resend`, "");
    }

}
