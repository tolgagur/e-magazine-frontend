import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../post-page/post-model";
import {PostService} from "../../post-page/post.service";

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {


  @Input() posts: PostModel[];

  constructor() {

  }

  ngOnInit(): void {
  }

}
