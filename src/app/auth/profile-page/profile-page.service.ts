import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProfileModel} from "./profile-model";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
  profileModels: ProfileModel[];


  constructor(private httpClient: HttpClient,private activatedRoute: ActivatedRoute) { }


  getUser(userId: number): Observable<ProfileModel> {
    return this.httpClient.get<ProfileModel>('/api/v1/profile/inquireUserInfo/' + userId);
  }
}
