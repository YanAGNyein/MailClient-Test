import { NgModule } from '@angular/core';

import { Login2Module } from 'app/main/pages/authentication/login-2/login-2.module';

import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/pages/errors/500/error-500.module';

//XL add route for login Component
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
const routes = [
    {
        path: 'auth/login-2',
        loadChildren: './authentication/login-2/login-2.module#Login2Module'
    },
];

@NgModule({
    imports: [
        //XL
        RouterModule.forChild(routes),
        FuseSharedModule,

        // Authentication
        Login2Module,


        // Errors
        Error404Module,
        Error500Module
    ]
})
export class PagesModule {

}
