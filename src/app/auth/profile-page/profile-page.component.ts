import { Component, OnInit } from '@angular/core';
import {ProfileModel} from "./profile-model";
import {ProfilePageService} from "./profile-page.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profileModel: ProfileModel;

  userId:number;

  constructor(private profileService: ProfilePageService) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.profileService.getUser(1).subscribe(data => {
      this.profileModel = data;
    }, error => {
      throwError(error);
    });
  }

}
