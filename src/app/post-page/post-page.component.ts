import {Component, OnInit} from '@angular/core';
import {PostService} from "./post.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePostPayload} from "./create-post.payload";
import {Observable, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  imageSrc: string;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private router: Router, private postService: PostService, private toastr: ToastrService ) {
    this.postPayload = {
      picUrl: '',
      title: '',
      content: '',
      file:'',
      fileSource:'',
    }
  }

  ngOnInit(): void {

    this.createPostForm = new FormGroup({
      picUrl: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])

    });
  }
  //sdasdsa//

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.postService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }



  //asdasd///





  get f(){
    return this.createPostForm.controls;
  }
  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.createPostForm.patchValue({
          fileSource: reader.result
        });
      };

    }
    console.log(event);
  }

  createPost() {
    this.postPayload.picUrl = this.createPostForm.get('picUrl').value;
    this.postPayload.title = this.createPostForm.get('title').value;
    this.postPayload.content = this.createPostForm.get('content').value;
    this.postPayload.file = this.createPostForm.get('file').value;
    this.postPayload.fileSource = this.createPostForm.get('fileSource').value;




    this.postService.createPost(this.postPayload).subscribe((data) => {

      this.toastr.success("Gönderiniz başarıyla alınmıştır.");
      this.router.navigateByUrl('home');

    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/home');
  }

}
