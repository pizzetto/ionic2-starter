import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class AuthService {
    LOGIN_URL: string = "http://postazamba.shakazamba.com/api/v1/auth/login";
    SIGNUP_URL: string = "http://postazamba.shakazamba.com/api/v1/auth/login";
    contentHeader: Headers = new Headers({ "Content-Type": "application/json" });
    jwtHelper: JwtHelper = new JwtHelper();
    user: User;
    error: string;
    token: string;

    constructor(private http: Http,
        public storage: Storage) {

        storage.ready().then(() => {
            storage.get('id_token')
                .then(
                data => {
                    if (!!data) {
                        this.user = <User> this.jwtHelper.decodeToken(data);
                        this.token = data;
                    }
                    console.log('recupero utente da storage');
                })
        });
    }
    public authenticated() {
        return !!this.user;
    }
    login(credentials) {
        return new Promise((resolve, reject) => {
            this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
                .map(res => res.json())
                .subscribe(
                data => {
                    this.authSuccess(data.id_token);
                    resolve(data);
                    console.log('login eseguito');
                },
                err => {
                    this.error = err;
                    console.log('errore login');
                    reject(err)
                }
                );
        });
    }
    signup(credentials) {
        return new Promise((resolve, reject) => {
            this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
                .map(res => res.json())
                .subscribe(
                data => {
                    this.authSuccess(data.id_token);
                    resolve(data)
                },
                err => {
                    this.error = err;
                    reject(err)
                }
                );
        });
    }
    logout() {
        this.storage.ready().then(() => {
            this.storage.remove('id_token');
        });
        this.user = null;
        this.token = null;
    }
    authSuccess(token) {
        this.error = null;
        this.storage.set('id_token', token);
        this.user = <User>this.jwtHelper.decodeToken(token);
    }
}