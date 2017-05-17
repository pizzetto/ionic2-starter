import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { User } from '../../models/user';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
    name: 'dashboard',
    segment: 'dashboard'
})
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {
    profileForm: FormGroup;

    constructor(public navCtrl: NavController,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private navParams: NavParams,
        private loadingCtrl: LoadingController) {

        this.profileForm = this.formBuilder.group({
            'email': ['', [Validators.required, this.emailValidator.bind(this)]],
            'password': ['', [Validators.required, this.passwordValidator.bind(this)]]
        });
    }

    passwordValidator(control: FormControl): { [s: string]: boolean } {
        if (control.value !== '') {
            if (control.value.length < 8 || control.value.length > 20) {
                return { invalidPassword: true };
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

    getUser() : User {
        return this.auth.user;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Dashboard');
    }

}
