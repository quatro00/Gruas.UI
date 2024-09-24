
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { NgChartsModule  } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { ThemeConstantService } from './shared/services/theme-constant.service';
import { ServicesInterceptorInterceptor } from './interceptors/services-interceptor.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExcelService } from './services/excel.service';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        FullLayoutComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        TemplateModule,
        SharedModule,
        NzBreadCrumbModule,
        NzSpinModule,
        NgChartsModule,
        NgApexchartsModule,
        AngularSvgIconModule.forRoot(),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServicesInterceptorInterceptor,
            multi: true

        },
        {
            provide: NZ_I18N,
            useValue: en_US,
        },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        ThemeConstantService,
        NzMessageService,
        ExcelService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
