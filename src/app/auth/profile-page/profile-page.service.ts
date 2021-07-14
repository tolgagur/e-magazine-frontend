import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProfileModel} from "./profile-model";
import {ActivatedRoute} from "@angular/router";
import {FollowPayload} from "./follow-me/follow-payload";

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
  profileModels: ProfileModel[];



  constructor(private http: HttpClient,private activatedRoute: ActivatedRoute) { }



  getUser(id: number): Observable<ProfileModel> {
    return this.http.get<ProfileModel>('/api/v1/profile/inquireUserInfo/' + id);
  }

  follow(followPayload: FollowPayload): Observable<any> {
    return this.http.post('api/v1/user/follow/', followPayload);
  }
  follow2(id: number): Observable<any> {
    return this.http.post('api/v1/user/follow/', id);
  }
}
