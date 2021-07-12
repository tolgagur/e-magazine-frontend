import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginComponent} from "../auth/login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isLoggedIn: boolean;
  userId: number;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.userId.subscribe((data: number) => this.userId = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userId = this.authService.getUserId();

  }
  goToUserProfile() {
    this.router.navigateByUrl('/profile/' + this.userId);
  }
}
