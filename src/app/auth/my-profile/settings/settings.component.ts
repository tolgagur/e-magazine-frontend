import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileModel} from "../../profile-page/profile-model";
import {ProfilePageService} from "../../profile-page/profile-page.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  id:number;
  profileModel: ProfileModel;

  constructor(private router: Router,
              private profileService: ProfilePageService,
              private activatedRoute: ActivatedRoute,
              private profilepageService: ProfilePageService) {

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
    this.router.navigateByUrl('/myprofile/');
  }



}

