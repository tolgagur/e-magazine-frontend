import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreatePostPayload} from "./create-post.payload";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('/api/v1/post/upload', postPayload,
      {
        responseType: 'json',
        headers: {
          token: "token"
        }
      });
  }
}
