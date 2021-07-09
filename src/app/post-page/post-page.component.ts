import {Component, OnInit} from '@angular/core';
import {PostService} from "./post.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePostPayload} from "./create-post.payload";
import {throwError} from "rxjs";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;



  constructor(private router: Router, private postService: PostService) {
    this.postPayload = {
      picUrl: '',
      title: '',
      content: '',

    }
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      picUrl: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),


    });
  }

  createPost() {
    this.postPayload.picUrl = this.createPostForm.get('picUrl').value;
    this.postPayload.title = this.createPostForm.get('title').value;
    this.postPayload.content = this.createPostForm.get('content').value;



    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/home');
  }

}
