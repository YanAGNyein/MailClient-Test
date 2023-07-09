import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

//XL
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from 'app/_services';

@Component({
    selector: 'login-2',
    templateUrl: 'login-2.component.html',
    styleUrls: ['login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Login2Component implements OnInit {
    loginForm: FormGroup;
    //XL
    loading = false;
    submitted = false;
    returnUrl: string;
    rememberme = false;

    success = false;
    loginFailed = false;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,

        //XL
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        //XL redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/app/mail/sent']);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        
        // // Zack Attempts for Remember Me (Not working as intended)
        // if (JSON.parse(localStorage.getItem('rememberme')) !== null) {
        //     this.loginForm = this._formBuilder.group({
        //         username: localStorage.getItem('username'),
        //         // token: localStorage.getItem('token'),
        //         rememberMe: JSON.parse(localStorage.getItem('rememberme')),
        //     });
        // }
        // else {
        //     this.loginForm = this._formBuilder.group({
        //         username: ['', [Validators.required, Validators.email]],
        //         password: ['', Validators.required],
        //     });
            
        // }

        // Xin Lei Remember Me
        if (localStorage.getItem('username') != null) {
            this.loginForm = this._formBuilder.group({
                //For RememberMe
                //XL use atob to decode user & PW
                username: [atob(localStorage.getItem('username')), Validators.required], //Zack Removed Email Validator to combine LDAP login with AMS login
                // password: [atob(localStorage.getItem('password')), Validators.required],
                password: ['', Validators.required],

                //Zack Remember me using cookies
                

            });
        }
        else {
            this.loginForm = this._formBuilder.group({
                //XL change to username
                //XL use atob to decode user & PW
                username: ['', Validators.required], //Zack Removed Email Validator to combine LDAP login with AMS login
                password: ['', Validators.required],
            });
        }

        //XL get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    //XL convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    //XL add onsubmit method
    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        var buttonName = document.activeElement.getAttribute("Name");
        
        this.loading = true;

        // if (buttonName == "AMS")
        // {
        this.authenticationService.login(this.f.username.value, this.f.password.value)
        // this.authenticationService.login_hashed(this.f.username.value, pass)
            .pipe(first())
            .subscribe(
                data => {
                    //XL if remember me check, store it in local;
                    if (this.rememberme) {
                        // console.log('RememberME checked');
                        //XL use btoa encode the user and pw
                        localStorage.setItem('username', btoa(this.f.username.value));
                        // localStorage.setItem('password', btoa(this.f.password.value));
                    };
                    //XL If login go to
                    //this.router.navigate([this.returnUrl]);
                    
                    //Zack: [NAVIGATION]
                    // Need to check the User-Navigation access
                    if (JSON.parse(localStorage.getItem('currentUser'))['userRole'] != 'USER ADMINISTRATOR')
                    {
                        this.router.navigate(['/apps/mail/sent']);
                    }
                    else
                    {
                        this.router.navigate(['/apps/mail/sent']);
                    }

                    // // Zack New Method of Remember Me
                    // if (this.rememberme) {
                    //     localStorage.setItem('username', data.loginName);
                    //     localStorage.setItem('rememberme', JSON.stringify(this.rememberme));
                    //     localStorage.setItem('token', data.token);
                    // }

                    // //If login go to
                    // //this.router.navigate([this.returnUrl]);
                    // if (JSON.parse(localStorage.getItem('currentUser'))['accessRole'].toLowerCase() != 'user administrator') {
                    //     this.router.navigate(['/apps/mail/sent']);
                    // }
                    // else {
                    //     this.router.navigate(['/apps/configuration/user/usermanagement']);
                    // }

                },
                error => {
                    console.log(error);
                    //XL display the meaningful error message
                    if (error.status == 0) {
                        this.alertService.error("HttpErrorResponse, Unknown Error. Please Check Network Status");
                        this.loading = false;
                    }
                    else if (error.status == 400) {
                        this.alertService.error("Username or Password is invalid");
                        this.loading = false;
                    }
                    else if (error.status == 200) {
                        this.alertService.error(error.error.text);
                        this.loading = false;
                    }
                    else {
                        this.alertService.error("Unknown Error!");
                        this.loading = false;
                    }
                });
        // }
        // else if (buttonName == "LDAP")
        // {
        //     this.authenticationService.loginLdap(this.f.username.value, this.f.password.value)
        //     // this.authenticationService.login_hashed(this.f.username.value, pass)
        //         .pipe(first())
        //         .subscribe(
        //             data => {
        //                 //XL if remember me check, store it in local;
        //                 if (this.rememberme) {
        //                     // console.log('RememberME checked');
        //                     //XL use btoa encode the user and pw
        //                     localStorage.setItem('username', btoa(this.f.username.value));
        //                     // localStorage.setItem('password', btoa(this.f.password.value));
        //                 };
        //                 //XL If login go to
        //                 //this.router.navigate([this.returnUrl]);
        //                 if (JSON.parse(localStorage.getItem('currentUser'))['accessRole'].toLowerCase() != 'user administrator')
        //                 {
        //                     this.router.navigate(['/apps/mail/sent']);
        //                 }
        //                 else
        //                 {
        //                     this.router.navigate(['/apps/configuration/user/usermanagement']);
        //                 }

        //                 // // Zack New Method of Remember Me
        //                 // if (this.rememberme) {
        //                 //     localStorage.setItem('username', data.loginName);
        //                 //     localStorage.setItem('rememberme', JSON.stringify(this.rememberme));
        //                 //     localStorage.setItem('token', data.token);
        //                 // }

        //                 // //If login go to
        //                 // //this.router.navigate([this.returnUrl]);
        //                 // if (JSON.parse(localStorage.getItem('currentUser'))['accessRole'].toLowerCase() != 'user administrator') {
        //                 //     this.router.navigate(['/apps/mail/sent']);
        //                 // }
        //                 // else {
        //                 //     this.router.navigate(['/apps/configuration/user/usermanagement']);
        //                 // }

        //             },
        //             error => {
        //                 console.log(error);
        //                 //XL display the meaningful error message
        //                 if (error.status == 0) {
        //                     this.alertService.error("HttpErrorResponse, Unknown Error. Please Check Network Status");
        //                     this.loading = false;
        //                 }
        //                 else if (error.status == 400) {
        //                     this.alertService.error("Username or Password is invalid");
        //                     this.loading = false;
        //                 }
        //                 else if (error.status == 200) {
        //                     this.alertService.error(error.error.text);
        //                     this.loading = false;
        //                 }
        //                 else {
        //                     this.alertService.error("Unknown Error!");
        //                     this.loading = false;
        //                 }
        //             });
        //     }   
    }
}
