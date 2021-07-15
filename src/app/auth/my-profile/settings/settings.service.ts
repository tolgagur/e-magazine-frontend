import { Injectable } from '@angular/core';
import {CreatePostPayload} from "../../../post-page/create-post.payload";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SettingsPayload} from "./settings.payload";
import {FormGroup} from "@angular/forms";
import {SignUpPayload} from "../../sign-up/sign-up.payload";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {



  constructor(private http: HttpClient) { }



  settingsUpdate(settingsPayload: SettingsPayload): Observable<any> {
    return this.http.put('/api/v1/post/upload/upload/', settingsPayload,
      {
        responseType: 'json',
        headers: {
          token: "token"
        }
      });
  }
}
