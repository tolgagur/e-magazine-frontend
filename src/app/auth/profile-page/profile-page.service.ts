import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProfileModel} from "./profile-model";

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {

  constructor(private httpClient: HttpClient) { }


  getUser(userId: number): Observable<ProfileModel> {
    return this.httpClient.get<ProfileModel>('/api/v1/profile/inquireUserInfo/' + userId);
  }
}
