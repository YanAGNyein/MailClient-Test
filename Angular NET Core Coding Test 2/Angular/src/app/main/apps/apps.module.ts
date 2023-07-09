import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from 'app/_helpers';


const routes: Routes = [
    //XL 20191119 Task# SAI-22 add Configuration Navigation
    {
        path: 'mail',
        loadChildren: './mail/mail.module#MailModule',
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
        
    ],
    declarations: [

    ]
})
export class AppsModule {
}
