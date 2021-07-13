import { Component, OnInit } from '@angular/core';
import {PostModel} from "../post-model";
import {PostService} from "../post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {throwError} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentPayload} from "../comment/comment.payload";
import {CommentService} from "../comment/comment.service";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private router: Router,private commentService: CommentService) {
    this.postId = this.activateRoute.snapshot.params.postId;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      comment: '',
      postId: this.postId
    };

  }

  ngOnInit(): void {
    this.getPostById();
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {

      console.log("girdi" );
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  postComment() {
    this.commentPayload.comment = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
    }, error => {
      throwError(error);
    })
  }

}
