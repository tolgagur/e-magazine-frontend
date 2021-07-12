import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {CreatePostPayload} from "./create-post.payload";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `/api/v1/post/upload/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('/api/v1/post/upload/', postPayload,
      {
        responseType: 'json',
        headers: {
          token: "token"
        }
      });
  }


}
