import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule, NavParams } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { HomeModule } from '../pages/home/home.module';
import { ListPage } from '../pages/list/list';
import { LoginModule } from '../pages/login/login.module';
import { DashboardModule } from '../pages/dashboard/dashboard.module';

import { AuthService } from '../providers/auth-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        ListPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicPageModule.forChild(MyApp),
        IonicStorageModule.forRoot(),
        HttpModule,
        CommonModule,
        HomeModule,
        LoginModule,
        DashboardModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ListPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthService
    ]
})
export class AppModule { }

/*import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomeModule } from '../pages/home/home.module';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';

import { AuthService } from '../providers/auth-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        ListPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        HttpModule,
        CommonModule,
        HomeModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ListPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthService
    ]
})
export class AppModule { }*/
