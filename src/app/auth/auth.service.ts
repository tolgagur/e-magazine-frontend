import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUpPayload} from "./sign-up/sign-up.payload";
import {Observable} from "rxjs";
import {LoginRequestPayload} from "./login/login-request.payload";
import {LoginResponse} from "./login/login-response.payload";
import {map} from "rxjs/operators";
import { LocalStorageService } from 'ngx-webstorage';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  @Output() userId: EventEmitter<number> = new EventEmitter();



  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }

  register(signUpPayload: SignUpPayload): Observable<any> {
    return this.httpClient.post('/api/v1/registration/', signUpPayload,
      {
        responseType: 'json',
        headers: {
          token: "token"
        }
      });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('/api/v1/login',
      loginRequestPayload).pipe(map(data => {
      this.localStorage.store("token", data.token);
      this.localStorage.store('success', data.success);
      this.localStorage.store('userId', data.userId);


      this.loggedIn.emit(true);
      this.userId.emit(data.userId);

      return true;

    }));

  }


  getJwtToken() {
    return this.localStorage.retrieve('token');
  }


  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }



}
