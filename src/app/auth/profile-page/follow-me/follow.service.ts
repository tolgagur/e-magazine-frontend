import { Injectable } from '@angular/core';
import {VotePayload} from "../../../home/vote-button/vote-payload";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FollowPayload} from "./follow-payload";

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private  http: HttpClient) { }
  follow(followPayload: FollowPayload): Observable<any> {
    return this.http.post('api/v1/user/follow/', followPayload);
  }
}
