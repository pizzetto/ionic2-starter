import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';


import { AuthService } from '../../providers/auth-service';

import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
    name: 'login',
    segment: 'login'
})
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
    authType: string = "login";
    loginForm: FormGroup;

    constructor(public navCtrl: NavController,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private navParams: NavParams,
        private toasterCtrl: ToastController,
        private loadingCtrl: LoadingController) {

        console.log(this.navParams);

        this.loginForm = this.formBuilder.group({
            'username': ['', [Validators.required, this.usernameValidator.bind(this)]],
            'password': ['', [Validators.required, this.passwordValidator.bind(this)]]
        });
    }

    ngOnInit(): void {
    }

    passwordValidator(control: FormControl): { [s: string]: boolean } {
        if (control.value !== '') {
            if (control.value.length < 8 || control.value.length > 20) {
                return { invalidPassword: true };
            }
        }
    }

    usernameValidator(control: FormControl): { [s: string]: boolean } {
        if (control.value !== '') {
            if (control.value.length < 8 || control.value.length > 20) {
                return { invalidUsername: true };
            }
        }
    }

    emailValidator(control: FormControl): { [s: string]: boolean } {
        if (control.value !== '') {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);

            if (re) {
                return null;
            }

            return { "invalidEmail": true };
        }
    }

    login(credentials) {
        let loader = this.loadingCtrl.create({
            content: "Logging in"
        });
        loader.present().then(() => {
            this.auth.login(credentials).then(
                (success) => {
                    loader.dismiss();
                    this.navCtrl.setRoot(DashboardPage);
                },
                (err) => {
                    loader.dismiss();
                    let toast = this.toasterCtrl.create({
                        message: err,
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                    console.log(err);
                }
            );
        });
    }

    signup(credentials) {
        let loader = this.loadingCtrl.create({
            content: "Logging in"
        });
        loader.present().then(() => {
            this.auth.signup(credentials).then(
                (success) => {
                    loader.dismiss();
                    this.navCtrl.setRoot(DashboardPage);
                },
                (err) => {
                    loader.dismiss();
                    console.log(err)
                }
            );
        });
    }

}
