import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TagModel} from "./tag-response";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }


  getAllTags(): Observable<Array<TagModel>> {
    return this.http.get<Array<TagModel>>(' /api/v1/inquireAllTags/');
  }
}
