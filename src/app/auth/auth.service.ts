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




  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }

  register(signUpPayload: SignUpPayload): Observable<any> {
    return this.httpClient.post('/api/v1/registration/', signUpPayload,
      {
        responseType: 'text',
        headers: {
          token: "token"
        }
      });
  }

  // login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
  //   return this.httpClient.post<LoginResponse>('/api/v1/login',
  //     loginRequestPayload).pipe(map(data => {
  //     this.localStorage.store("token", data.token);
  //     this.localStorage.store('success', data.success);
  //     this.localStorage.store('userId', data.userId);
  //     console.log(this.isAuthenticated());
  //     this.loggedIn.emit(true);
  //     this.userId.emit(data.userId);
  //     return true;
  //   }));
  // }

  login(loginRequestPayload:LoginRequestPayload){
    return this.httpClient.post<LoginResponse>('/api/v1/login/',loginRequestPayload)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      this.loggedIn.emit(true);
      return true;
    }
    else{
      return false;
    }
  }


  getJwtToken() {
    return this.localStorage.retrieve('token');
  }



  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }



}
