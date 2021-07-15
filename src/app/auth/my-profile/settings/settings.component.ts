import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileModel} from "../../profile-page/profile-model";
import {ProfilePageService} from "../../profile-page/profile-page.service";
import {throwError} from "rxjs";
import {AuthService} from "../../auth.service";
import {ToastrService} from "ngx-toastr";
import {SettingsService} from "./settings.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingsPayload} from "./settings.payload";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  id:number;
  profileModel: ProfileModel;
  settingsForm: FormGroup;

  settingsPayload: SettingsPayload;
  imageSrc: string;

  constructor(private router: Router,
              private profileService: ProfilePageService,
              private activatedRoute: ActivatedRoute,
              private profilepageService: ProfilePageService,
              private settingsService:SettingsService,
              private toastr: ToastrService) {

    this.id = this.activatedRoute.snapshot.params.id;
    this.settingsPayload = {
      firstName: '',
      lastName: '',
      email: '',
      profilePicture:''
    };

    this.profilepageService.getMyUser().subscribe(data => {
      this.profileModel = data;
    });

  }

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      profilePicture: new FormControl('', [Validators.required]),
    });
  }

  get f(){
    return this.settingsForm.controls;
  }
  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.settingsForm.patchValue({
          profilePicture: reader.result
        });
      };
    }
    console.log(event);
  }
  settings() {
    this.settingsPayload.firstName = this.settingsForm.get('firstName').value;
    this.settingsPayload.lastName = this.settingsForm.get('lastName').value;
    this.settingsPayload.email = this.settingsForm.get('email').value;
    this.settingsPayload.profilePicture = this.settingsForm.get('profilePicture').value;
    this.settingsService.settingsUpdate(this.settingsPayload)
      .subscribe(data => {
        console.log('Kayıt basarili');
        this.toastr.info('basariyla güncellendi');

        this.router.navigate(['/login'],
          {queryParams: {registered: 'true'}});
      }, error => {
        console.log(error);
        console.log('basarisiz');
        this.toastr.error('Bu mail hesabına ait kullanıcı mevcuttur.');


      });
  }
































  private getUser() {
    this.profileService.getMyUser().subscribe(data => {
      this.profileModel = data;
      this.id= data.id;
    }, error => {
      throwError(error);
    });
  }
  settingsUrl() {
    this.router.navigateByUrl('/myprofile/');
  }



}

