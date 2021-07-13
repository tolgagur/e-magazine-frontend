import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../post-page/post-model";

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {VoteService} from "./vote.service";
import {AuthService} from "../../auth/auth.service";
import {PostService} from "../../post-page/post.service";
import {ToastrService} from "ngx-toastr";

import {throwError} from "rxjs";
import {VotePayload} from "./vote-payload";


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;

  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;


  constructor(private voteService: VoteService,
              private authService: AuthService,
              private postService: PostService, private toastr: ToastrService) {

    this.votePayload = {
      postId: undefined
    }

    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    console.log("upvotepost");
    this.vote();
  }
  private vote() {
    this.votePayload.postId = this.post.postId;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }
  private updateVoteDetails() {
    this.postService.getPost(this.post.postId).subscribe(post => {
      this.post = post;
    });
  }





}
