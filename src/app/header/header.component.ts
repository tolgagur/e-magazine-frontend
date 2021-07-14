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
  id: number;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.id.subscribe((data: number) => this.id = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.id = this.authService.getUserId();

  }
  goToUserProfile() {
    this.router.navigateByUrl('/profile/');
  }
}
