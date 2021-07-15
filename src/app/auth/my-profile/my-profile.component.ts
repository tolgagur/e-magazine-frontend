import { Component, OnInit } from '@angular/core';
import {ProfilePageService} from "../profile-page/profile-page.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileModel} from "../profile-page/profile-model";
import {throwError} from "rxjs";
import {faArrowUp, faClock, faCog } from '@fortawesome/free-solid-svg-icons';
import {PostModel} from "../../post-page/post-model";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  id:number;
  profileModel: ProfileModel;
  faClock=faClock;
  faCog= faCog;
  postUser : PostModel;
  posts: ProfileModel[];




  constructor(private profileService: ProfilePageService,
              private activatedRoute: ActivatedRoute,
              private profilepageService: ProfilePageService,
              private router: Router) {
    this.id = this.activatedRoute.snapshot.params.id;

    this.profilepageService.getMyUser().subscribe(data => {
      this.profileModel = data;
    });

  }

  ngOnInit(): void {
  }

  private getUser() {
    this.profileService.getMyUser().subscribe(data => {
      this.profileModel = data;
      this.id= data.id;
    }, error => {
      throwError(error);
    });
  }
  settingsUrl() {
    this.router.navigateByUrl('/settings/');
  }

}
