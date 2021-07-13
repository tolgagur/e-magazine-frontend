import { Injectable } from '@angular/core';
import {CommentPayload} from "./comment.payload";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.http.post<any>('api/v1/user/commentPost/', commentPayload);
  }
}
