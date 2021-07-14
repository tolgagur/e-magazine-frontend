import {CommentType} from "./comment-type";

export class PostModel{
  userId: string;
  postId:number;
  userName: string;
  title: string;
  content: string;
  picUrl: string;
  likeCount: number;
  commentCount: number;
  createdDate:string;
  liked: boolean;
  downVote: boolean;
  fullName: string;
  likedd: boolean;
  picture:string;
  comments: Array<CommentType> = [];




}
