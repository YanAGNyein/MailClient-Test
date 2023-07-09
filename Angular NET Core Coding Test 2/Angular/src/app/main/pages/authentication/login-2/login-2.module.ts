import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import { Login2Component } from 'app/main/pages/authentication/login-2/login-2.component';

//XL add alertcomponent
import { AlertComponent } from 'app/_components';

const routes = [
    {
        path: 'auth/login-2',
        component: Login2Component
    }
];

@NgModule({
    declarations: [
        Login2Component,
        //XL add alertcomponent
        AlertComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule
    ],
    //XL make this AlertComponent to be share by register
    exports: [AlertComponent]
})
export class Login2Module {
}
