import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import { KesfetComponent } from './kesfet/kesfet.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { PostPageComponent } from './post-page/post-page.component';
import { ProfilePageComponent } from './auth/profile-page/profile-page.component';
import {ToastrModule} from "ngx-toastr";
import {NgxWebstorageModule} from "ngx-webstorage";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    KesfetComponent,
    SponsorComponent,
    PostPageComponent,
    ProfilePageComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxWebstorageModule.forRoot(),
        ToastrModule.forRoot({
          positionClass:"toast-bottom-right"
        }),
        BrowserAnimationsModule

    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
