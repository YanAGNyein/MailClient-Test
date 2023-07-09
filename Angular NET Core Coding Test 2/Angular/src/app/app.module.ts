import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

//XL
import { Login2Module } from 'app/main/pages/authentication/login-2/login-2.module';

//XL 20191115 Task# SAI-21 Implement Session Timeout Feature to Login Component
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service

//XL 20191224 Routing : 404 page not found on refresh after deployment
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//XL dialog

import { authInterceptorProviders } from '@/_helpers/jwt.interceptor';

//GS change date format
import { MAT_DATE_FORMATS } from '@angular/material/core';



const appRoutes: Routes = [
    {
        path: 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path: '**',
        redirectTo: 'auth/login-2'
    }
];

//GS change date format
const MY_FORMATS = {
    parse: {
      dateInput: 'DD-MM-YYYY',
    },
    display: {
      dateInput: 'DD-MM-YYYY',
      monthYearLabel: 'MM-YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        // in Memory DB not needed for Production
        // InMemoryWebApiModule.forRoot(InMemoryDatabaseService, {
        //     delay: 0,
        //     passThruUnknownUrl: true
        // }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,

        //XL
        Login2Module,
        SampleModule ,
      ],
    //XL dialog

    //XL 20191115 Task# SAI-21 Implement Session Timeout Feature to Login Component
    providers: [BnNgIdleService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        //GS change date format
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        authInterceptorProviders,
    ], // add it to the providers of your module
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule {
}
