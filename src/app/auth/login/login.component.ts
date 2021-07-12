import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestPayload} from "./login-request.payload";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {throwError} from "rxjs";
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean;
  registerSuccessMessage: string;

  @Output() userId: EventEmitter<number> = new EventEmitter();





  constructor(private formBuilder:FormBuilder,
              private authService:AuthService, private toastrService:ToastrService,private router: Router,) {


  }

  ngOnInit(): void {
    this.createLoginForm();

  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{

        localStorage.setItem("token",response.token);
        localStorage.setItem("userId",String(response.userId));

        // @ts-ignore
        this.userId.emit(response.userId);

        this.toastrService.info("giris basarili");
        this.router.navigateByUrl('home');

      },responseError=>{
        //console.log(responseError)
        this.toastrService.error("Hatalı bilgiler girdiniz")
      })
    }
  }





}
