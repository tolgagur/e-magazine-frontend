import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestPayload} from "./login-request.payload";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {throwError} from "rxjs";
import {Output, EventEmitter} from '@angular/core';


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

  @Output() id: EventEmitter<string> = new EventEmitter();

  userIdx: number;



  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router,) {
    this.loginRequestPayload = {
      email: '',
      password: ''
    };


  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.createLoginForm();

  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }




  login() {
    this.loginRequestPayload.email = this.loginForm.get('email').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('home');
      this.toastrService.success('Login Successful');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }


  loginn() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {


        // localStorage.setItem("token", response.token);
        // localStorage.setItem("id", String(response.id));



        this.toastrService.info("giris basarili");
        this.router.navigateByUrl('home');

      }, responseError => {
        //console.log(responseError)
        this.toastrService.error("Hatalı bilgiler girdiniz")
      })
    }
  }


  getUserId() {
    return localStorage.retrieve('id');
  }


}
