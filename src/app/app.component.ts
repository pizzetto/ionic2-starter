import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { AuthService } from '../providers/auth-service';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';

@Component({
    templateUrl: 'app.html',
    providers: [AuthService]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;

    pages: Array<{ title: string, component: any, navParamas: any, showIfLogged: any }>;

    constructor(public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        private auth: AuthService,
        storage: Storage) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage, navParamas: new NavParams(), showIfLogged: null },
            { title: 'List', component: ListPage, navParamas: new NavParams(), showIfLogged: null },
            { title: 'Login', component: LoginPage, navParamas: new NavParams(), showIfLogged: false },
            { title: 'My Home', component: DashboardPage, navParamas: new NavParams(), showIfLogged: true },
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
          // do whatever you need to do here.
          this.statusBar.styleDefault();
          setTimeout(() => {
            this.splashScreen.hide();
          }, 100);
        });
        this.rootPage = HomePage;
    }

    showMenuButton(showIfLogged): boolean {
        if (showIfLogged === null) {
            return true;
        }
        if (showIfLogged) {
            return this.auth.authenticated();
        } else {
            return !this.auth.authenticated();
        }
    }

    logOut() {
        this.auth.logout();
        this.nav.setRoot(HomePage);
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component, page.navParamas);
    }
}
