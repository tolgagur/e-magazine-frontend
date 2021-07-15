import { Component, OnInit } from '@angular/core';
import {ProfileModel} from "./profile-model";
import {ProfilePageService} from "./profile-page.service";
import {throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {faArrowUp, faClock, faComments } from '@fortawesome/free-solid-svg-icons';
import {FollowPayload} from "./follow-me/follow-payload";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profileModel: ProfileModel;
  faClock=faClock;
  id:number;
  followPayload: FollowPayload;
  faArrowUp = faArrowUp;
  followme :boolean;
  posts: ProfileModel[];

  isLoggedIn: boolean;



  constructor(private profileService: ProfilePageService,
              private activatedRoute: ActivatedRoute,
              private profilepageService: ProfilePageService) {

    this.followPayload = {
      id:undefined
    }
    this.id = this.activatedRoute.snapshot.params.id;
    this.profilepageService.getUser(this.id).subscribe(data => {
      this.profileModel = data;
    });

  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.profileService.getUser(this.id).subscribe(data => {
      this.profileModel = data;
      this.id= data.id;
    }, error => {
      throwError(error);
    });
  }






}
