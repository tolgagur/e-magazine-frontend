import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './auth/login/login.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import {KesfetComponent} from './kesfet/kesfet.component';
import {SponsorComponent} from './sponsor/sponsor.component';
import {PostPageComponent} from './post-page/post-page.component';
import {ProfilePageComponent} from './auth/profile-page/profile-page.component';
import {ToastrModule} from "ngx-toastr";
import {NgxWebstorageModule} from "ngx-webstorage";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HomeComponent} from './home/home.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { PostTileComponent } from './home/post-tile/post-tile.component';
import {VoteButtonComponent} from "./home/vote-button/vote-button.component";
import { ViewPostComponent } from './post-page/view-post/view-post.component';
import { FollowMeComponent } from './auth/profile-page/follow-me/follow-me.component';
import { TagComponent } from './post-page/tag/tag.component';
import { MyProfileComponent } from './auth/my-profile/my-profile.component';
import { SettingsComponent } from './auth/my-profile/settings/settings.component';

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
    HomeComponent,
    PostTileComponent,
    VoteButtonComponent,
    ViewPostComponent,
    FollowMeComponent,
    TagComponent,
    MyProfileComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
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
export class AppModule {
}
