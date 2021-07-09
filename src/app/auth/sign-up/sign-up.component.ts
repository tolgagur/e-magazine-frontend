import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SignUpPayload} from './sign-up.payload';
import {AuthService} from "../auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  signUpPayload: SignUpPayload;

  constructor(private authService: AuthService, private router: Router,private toastr: ToastrService) {
    this.signUpPayload = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }


  register() {
    this.signUpPayload.firstName = this.registerForm.get('firstName').value;
    this.signUpPayload.lastName = this.registerForm.get('lastName').value;
    this.signUpPayload.email = this.registerForm.get('email').value;
    this.signUpPayload.password = this.registerForm.get('password').value;

    this.authService.register(this.signUpPayload)
      .subscribe(data => {
        console.log('Kayıt basarili');
        this.toastr.info('Başarıyla kayıt oldunuz.');

        this.router.navigate(['/login'],
          {queryParams: {registered: 'true'}});
      }, error => {
        console.log(error);
        console.log('kayit başarısız');
        this.toastr.error('Hatalı bilgiler girdiniz.');


      });
  }


}
