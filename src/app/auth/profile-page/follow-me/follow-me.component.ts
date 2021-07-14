import {Component, Input, OnInit} from '@angular/core';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {ProfileModel} from "../profile-model";
import {FollowPayload} from "./follow-payload";
import {AuthService} from "../../auth.service";
import {PostService} from "../../../post-page/post.service";
import {ToastrService} from "ngx-toastr";
import {FollowService} from "./follow.service";
import {throwError} from "rxjs";
import {ProfilePageService} from "../profile-page.service";

@Component({
  selector: 'app-follow-me',
  templateUrl: './follow-me.component.html',
  styleUrls: ['./follow-me.component.css']
})
export class FollowMeComponent implements OnInit {

  @Input() user: ProfileModel;

  followPayload: FollowPayload;
  faArrowUp = faArrowUp;
  isLoggedIn: boolean;


  constructor(private authService: AuthService,
              private followService: FollowService,
              private postService: PostService,
              private profilePageService: ProfilePageService,
              private toastr: ToastrService) {
    this.followPayload = {
      id: undefined
    }
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);

  }

  ngOnInit(): void {
    this.updateFollowDetails();
  }

  followPost() {
    this.follow();
  }

  private follow() {
    this.followPayload.id = this.user.id;
    this.followService.follow(this.followPayload).subscribe(() => {
      this.updateFollowDetails();
    }, error => {

      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateFollowDetails() {
    this.profilePageService.getUser(this.user.id).subscribe(user => {
      this.user = user;
    });
  }

}
