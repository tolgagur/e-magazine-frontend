import { Component, OnInit } from '@angular/core';
import {ProfileModel} from "./profile-model";
import {ProfilePageService} from "./profile-page.service";
import {throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profileModel: ProfileModel;

  userId:string;

  constructor(private profileService: ProfilePageService,
              private activatedRoute: ActivatedRoute,
              private profilepagaService: ProfilePageService) {
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.profilepagaService.getUser(this.userId).subscribe(data => {
      this.profileModel = data;
    });

  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.profileService.getUser(this.userId).subscribe(data => {
      this.profileModel = data;
    }, error => {
      throwError(error);
    });
  }

}
