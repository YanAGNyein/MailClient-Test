import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation, navigationAssetViewer, navigationCustodian, navigationUserAdmin } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';

// Get UserRoles Enum
import { UserRoles } from '@/_models/Enums/user-roles.enum';

//XL
import { AuthenticationService } from './_services';
import { User } from './_models';
import { Router } from '@angular/router';
//XL 20191115 Task# SAI-21 Implement Session Timeout Feature to Login Component
import { BnNgIdleService } from 'bn-ng-idle';
import { UserModuleAccessService } from './_services/usermoduleaccess.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    //XL
    currentUser: User;

    fuseConfig: any;
    navigation: any;
    navigationAssetViewer: any;
    navigationCustodian: any;
    navigationUserAdmin: any;

    UserRoles = UserRoles;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,

        //XL
        private router: Router,
        private authenticationService: AuthenticationService,
        private userModuleAccessService: UserModuleAccessService,

        //XL 20191115 Task# SAI-21 Implement Session Timeout Feature to Login Component
        private bnIdle: BnNgIdleService,

    ) {
        // Get default navigation
        // this.navigation = navigation;
        // this.navigationCustodian = navigationCustodian;
        // this.navigationUserAdmin = navigationUserAdmin;

        // Register the navigation to the service
        // this._fuseNavigationService.register('master', this.navigation);
        // this._fuseNavigationService.register('applicationAdministrator', this.navigation);

        //this._fuseNavigationService.register('custodian', this.navigationCustodian);
        // this._fuseNavigationService.register('custodian', this.navigation);
        // this._fuseNavigationService.register('userAdministrator', this.navigation);

        // Set the master navigation as our current navigation
        // Zack
        if (this.authenticationService.currentUserValue === null) {
            this.authenticationService.logout();
        }
        else
        {
            // Get navigation
            this.userModuleAccessService.getAllModuleByUserId(this.authenticationService.currentUserValue.userID);
        }

        

        //XL
        // this._fuseNavigationService.setCurrentNavigation('master');
        // if (this.authenticationService.currentUserValue.role === "ADMINISTRATOR") {
        //     this._fuseNavigationService.setCurrentNavigation('sub');
        // }
        if (this.authenticationService.currentUserValue === null) {
            this.authenticationService.logout();
            // this._fuseNavigationService.setCurrentNavigation('master');
        }
        else {
            //this.authenticationService.currentUserValue.userRole is a string[]
            // if (this.authenticationService.currentUserValue.userRole.includes("APPLICATION ADMINISTRATOR")) {
            // if (this.authenticationService.currentUserValue.userRole != null)) {
                // this._fuseNavigationService.setCurrentNavigation('master');
            // }
            // else if (this.authenticationService.currentUserValue.accessRole === "ASSET VIEWER") {
            //     this._fuseNavigationService.setCurrentNavigation('assetViewer');
            // else if (this.authenticationService.currentUserValue.userRole.includes("ASSET ADMINISTRATOR")) {
            //     this._fuseNavigationService.setCurrentNavigation('master');
            // }
            // // else if (this.authenticationService.currentUserValue.accessRole === "CUSTODIAN") {
            // //     this._fuseNavigationService.setCurrentNavigation('custodian');
            // else if (this.authenticationService.currentUserValue.userRole.includes("CUSTODIAN")) {
            //     this._fuseNavigationService.setCurrentNavigation('master');
            // }
            // // else if (this.authenticationService.currentUserValue.accessRole === "USER ADMINISTRATOR") {
            // //     this._fuseNavigationService.setCurrentNavigation('userAdministrator');
            // else if (this.authenticationService.currentUserValue.userRole.includes("USER ADMINISTRATOR")) {
            //     this._fuseNavigationService.setCurrentNavigation('master');
            // }
            // else {
                // this.authenticationService.logout();
                // this._fuseNavigationService.setCurrentNavigation('master');
            // }
        }

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        //XL
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    }

    //XL
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/auth/login-2']);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        //XL get all location first
        // this._locationService.getLocations();
        // this._todoService.getPurposes();
        // this._dashboardService.loadDashboardCheckoutQty();
        // this._dashboardService.loadDashboardCycleCountTasksQty();
        // this._dashboardService.loadTransactionQtyPastDays();
        // this._dashboardService.loadDashboardTop3Items();
        // this._dashboardService.loadDashboardTotalInventoryCount();

        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                }
                else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });

        //XL 20191115 Task# SAI-21 Implement Session Timeout Feature to Login Component
        this.bnIdle.startWatching(1200).subscribe((isTimedOut: boolean) => {

            // console.log('session expired');
            this.authenticationService.logout();
            this.router.navigate(['/auth/login-2']);

        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
