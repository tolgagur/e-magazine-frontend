import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {LoginComponent} from './auth/login/login.component';
import {KesfetComponent} from "./kesfet/kesfet.component";
import {PostPageComponent} from "./post-page/post-page.component";
import {ProfilePageComponent} from "./auth/profile-page/profile-page.component";
import {SponsorComponent} from "./sponsor/sponsor.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth/auth.guard";
import {ViewPostComponent} from "./post-page/view-post/view-post.component";


const routes: Routes = [
  { path: 'post/:postId', component: ViewPostComponent,canActivate: [AuthGuard] },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'kesfet', component: KesfetComponent,canActivate: [AuthGuard]},
  {path: 'post', component: PostPageComponent,canActivate: [AuthGuard]},
  {path: 'profile/:userId', component: ProfilePageComponent,canActivate: [AuthGuard]},
  {path: 'sponsor', component: SponsorComponent,canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
