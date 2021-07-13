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


  constructor(private http: HttpClient,private activatedRoute: ActivatedRoute) { }


  getUser(userId: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>('/api/v1/profile/inquireUserInfo/' + userId);
  }
}
