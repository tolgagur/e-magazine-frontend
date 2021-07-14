import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../post-page/post-model";
import {PostService} from "../../post-page/post.service";
import {Router} from "@angular/router";
import {faClock, faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {


  @Input() posts: PostModel[];
  faComments = faComments;
  faClock = faClock;




  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  goToPost(postId: number): void {
    this.router.navigateByUrl('/post/' + postId);
  }

}
